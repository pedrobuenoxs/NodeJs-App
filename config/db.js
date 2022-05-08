if(process.env.NODE_ENV =="production"){
    module.exports = {mongoURI: "mongodb+srv://root:54321@cluster0.7mrcj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"}
} else {
    module.exports = {mongoURI: "mongodb://localhost/db1"}
}