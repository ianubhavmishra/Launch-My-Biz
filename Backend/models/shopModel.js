import mongoose from 'mongoose'

const shopSchema = new mongoose.Schema({
    ownersId:{type:String,require:true},
    logo:{type:String,require:true},
    siteName:{type:String,require:true},
    welcomeText:{type:String,require:true},
    tagline:{type:String,require:true},
    bgImage:{type:String,require:true},
    products:{type:Object,require:true},
    footer:{type:Object,require:true},
    template:{type:String,require:true},
    url:{type:String,require:true}
})

const shopModel = mongoose.models.order || mongoose.model("shop",shopSchema); 
export default shopModel; 