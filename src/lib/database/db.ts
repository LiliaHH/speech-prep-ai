import mongoose from 'mongoose';

interface Connection {
  isConnected?: number;
}

const connection: Connection = {};

async function connectToDB(): Promise<void> {
  if (connection.isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string
    //     ,
    //      {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // } as mongoose.ConnectOptions
    );
    connection.isConnected = db.connections[0].readyState;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

export default connectToDB;