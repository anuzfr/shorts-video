import mongoose from "mongoose";

// Test database connection
async function testConnection() {
  const MONGODB_URI = process.env.MONGODB_URI;
  
  console.log("Testing MongoDB connection...");
  console.log("MONGODB_URI:", MONGODB_URI ? "Set" : "Not set");
  
  if (!MONGODB_URI) {
    console.error("❌ MONGODB_URI is not defined in environment variables");
    console.log("Please create a .env.local file with:");
    console.log("MONGODB_URI=mongodb://localhost:27017/short-video");
    return;
  }
  
  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Successfully connected to MongoDB!");
    
    // Test if we can access the database
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log("📊 Available collections:", collections.map(c => c.name));
    
    await mongoose.disconnect();
    console.log("✅ Connection test completed successfully!");
    
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error(error.message);
    
    if (error.message.includes("ECONNREFUSED")) {
      console.log("\n💡 Possible solutions:");
      console.log("1. Make sure MongoDB is running locally");
      console.log("2. Check if MongoDB is running on the correct port (default: 27017)");
      console.log("3. If using MongoDB Atlas, check your connection string");
    }
  }
}

testConnection(); 