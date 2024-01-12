import mongoose from "mongoose";

class Database {
  constructor(uri, options) {
    this.uri = uri;
    this.options = options;
  }

  async connect() {
    try {
      await mongoose.connect(this.uri, this.options);
      console.log("Database Connected ✅");
    } catch (error) {
      console.log("Database Connection Error: ", error);
    }
  }

  async disconnect() {
    try {
      await mongoose.disconnect();
      console.log("Database Disconnected ✅");
    } catch (error) {
      console.log("Database Disconnection Error: ", error);
    }
  }
}

export default Database;
