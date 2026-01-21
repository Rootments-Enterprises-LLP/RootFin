import mongoose from 'mongoose';

const connectMongoDB = async () => {
    try {
        // Support both development and production MongoDB URIs
        const mongoUri = process.env.NODE_ENV === 'production' 
            ? process.env.MONGODB_URI 
            : (process.env.MONGODB_URI_DEV || process.env.MONGODB_URI);
        
        if (!mongoUri) {
            throw new Error('MongoDB URI is not defined in environment variables');
        }
        
        await mongoose.connect(mongoUri); 
        console.log(`Connected to MongoDB [${process.env.NODE_ENV || 'development'}]`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit process with failure
    }
}

export default connectMongoDB;