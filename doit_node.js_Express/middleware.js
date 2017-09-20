// static 미들웨어
var static = require('serve-static');

app.use(static(path.join(__dirname, 'public'))); // public 폴더 안의 파일들을 클라이언트에서 바로 점근할 수 있게 만들어 준다.
res.end("<img src ='/img/house.png' width='50%'>"); // 이미지 파일을 웹 브라우저에서 보기위해
app.use('/public', static(path.join(__dirname, 'public'))); // public 폴더 안에 있는 파일을 /public 패스로 접근하도록 만들어 준다.