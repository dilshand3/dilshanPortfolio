import {app} from "./app.js"
import connectDB from "./db/db.js"

connectDB()
.then(() => {
    app.listen(process.env.PORT,() => {
      console.log(`server is running on port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB connection failed due to",error);    
})