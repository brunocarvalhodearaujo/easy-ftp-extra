this project is an bridge for [easy-ftp](https://github.com/humy2833/easy-ftp) supporting use of promises

## Install

```sh
$ npm install easy-ftp-extra
```

## Usage

```js
const EasyFTP = require('easy-ftp-extra')

const ftp = new EasyFTP()

const config = {
  host: '',
  port: 21,
  username: '',
  password: ''
}

//서버 접속(connect)
ftp.connect(config)

//폴더 변경(directory change)
ftp.cd('/')
  .then(path => console.log(path))
  .catch(console.error)

ftp.rm('/filename')
  .then(console.log)
  .catch(console.error)

//폴더 생성(하위 폴더 포함 생성)(make directory)
ftp.mkdir('/directory')
  .then(console.log)
  .catch(console.error)

//파일 or 폴더 이동 혹은 이름 변경(file or directory move or change filename)
ftp.mv('/filename', '/newFilename')
  .then(newPath => console.log(newPath))
  .catch(console.error)

//폴더 내 파일목록 반환(show files in directory)
ftp.ls('/directory')	
  .then(list => console.log(list))
  .catch(console.error)

//ftp 서버상의 현재 작업 경로 반환(return server path)
ftp.pwd()
  .then(path => console.log(path))
  .catch(console.error)

//서버에 파일이 존재하는지 여부 반환(boolean)
ftp.exist('/filename')
  .then(exist => console.log(exist))
  .catch(console.error)

ftp.upload('/test.txt', '/test.txt')
  .then(console.log)
  .catch(console.error)

ftp.download('/test.txt', '/test.txt')
  .then(console.log)
  .catch(console.error)
```
