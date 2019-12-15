var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://groupK:FinalProjectK@cluster0-cn5uq.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
   
});

mongoose.connection.on("connected", () => {
    console.log("mongodb数据库连接成功")
});
