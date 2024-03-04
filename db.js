const mongoose = require('mongoose')

// const URL = 'mongodb+srv://augustineugwu:Auestinegluy007@austinecluster.tk4adli.mongodb.net/madugu_network'

const URL = 'mongodb+srv://ukejemicheal:HFshR6WpLVRrtSls@cluster0.csedbmx.mongodb.net/magudu_social'

const connectDB = async ()=>{
    try{
        const connect = await mongoose.connect(URL)
        console.log(`MongoDB connected: ${connect.connection.host}`)
    }
    catch(error){
        console.log(`error: ${error}`)
        process.exit(1)
    }
}

module.exports = connectDB