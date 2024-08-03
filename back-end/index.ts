import express, { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
const port = 3008;

const JWT_SECRET = "535353";
const REFRESH_TOKEN_SECRET = "refresh_secret";

app.use(
  cors({
    origin: "http://localhost:4200",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    console.error("No token provided");
    return res.status(401).json({ error: "No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      console.error("Token verification failed:", err.message);
      return res
        .status(403)
        .json({ error: "Token verification failed", details: err.message });
    }
    req.user = user;
    next();
  });
};

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

const generateAccessToken = (user: any) => {
  return jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

const generateRefreshToken = (user: any) => {
  return jwt.sign({ userId: user.id, email: user.email }, REFRESH_TOKEN_SECRET);
};

app.post("/register", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error while creating user:", error);
    res.status(500).json({ message: "Failed to create user" });
  }
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        user: { connect: { id: user.id } },
      },
    });

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Error while logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/token", async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  try {
    const tokenRecord = await prisma.refreshToken.findFirst({
      where: { token: refreshToken },
    });

    if (!tokenRecord) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }

    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err: any, user: any) => {
      if (err) {
        return res.status(403).json({ error: "Invalid refresh token" });
      }

      const newAccessToken = generateAccessToken(user);
      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error("Error while refreshing token:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete(
  "/logout",
  authenticateToken,
  async (req: Request, res: Response) => {
    try {
      const { token } = req.body;

      if (!token) {
        return res.status(400).json({ error: "Token required" });
      }

      const tokenRecord = await prisma.refreshToken.findFirst({
        where: { token },
      });

      if (!tokenRecord) {
        return res.status(404).json({ error: "Token not found" });
      }

      await prisma.refreshToken.delete({
        where: { id: tokenRecord.id },
      });

      res.status(204).end();
    } catch (error) {
      console.error("Error while logging out:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

app.get("/me", authenticateToken, async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Error while fetching user:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

app.post("/profile", authenticateToken, async (req: Request, res: Response) => {
  const {
    userName,
    profileId,
    colleague,
    workLocation,
    workTitle,
    location,
    phoneNumber,
  } = req.body;

  const userId = req.user.userId;

  try {
    const profile = await prisma.profile.create({
      data: {
        profileId: profileId || undefined,
        colleague,
        workLocation,
        workTitle,
        location,
        phoneNumber,
        userName: userName || undefined,
        user: { connect: { id: userId } },
      },
    });
    res.status(201).json(profile);
  } catch (error) {
    console.error("Error while creating profile:", error);
    res.status(500).json({ message: "Failed to create profile" });
  }
});

app.get("/profiles", authenticateToken, async (req: Request, res: Response) => {
  try {
    const profiles = await prisma.profile.findMany();
    res.json(profiles);
  } catch (error) {
    console.error("Error while fetching profiles:", error);
    res.status(500).json({ message: "Failed to fetch profiles" });
  }
});

app.get("/user", authenticateToken, async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error while fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});
