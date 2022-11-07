<!--
# mysns
    [![Top Langs](https://github-readme-stats.vercel.app/api/top-langs/?username=salutJuillet&layout=compact)](https://github.com/salutJuillet/mysns)
-->


<!-- ABOUT THE PROJECT -->
# mysns

<div align="center">
  <img src="public/images/preview.png" width="700px"/> <br/>
  <a href="https://youtu.be/asSUHK-f7Vg" target="_blank">https://youtu.be/asSUHK-f7Vg</a>
</div>
<br/><br/>
자유롭게 포스트 작성, 수정, 삭제가 가능한 SNS입니다.
<br/><br/>



## Built With

[<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/>][NodeJS-url]  
[<img src="https://img.shields.io/badge/Sequelize-52B0E7?style=flat-square&logo=Sequelize&logoColor=white"/>][Sequelize-url]  
[<img src="https://img.shields.io/badge/Nunjucks-1C4913?style=flat-square&logo=Nunjucks&logoColor=white"/>][Nunjucks-url]  
<br/><br/>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Before installation you have to import blog posts data using mongoimport. Follow the [Database Tools Installation Guide](https://www.mongodb.com/docs/database-tools/installation/installation/) to install 
mongoimport.


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/salutJuillet/mysns.git
   ```
2. Update file config\config.json with your MySQL information
   ```
   "development": {
    "username": "username",
    "password": "password",
    "database": "database name",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "timezone":"+09:00"
    },
   ```
3. Create file .env on root folder and fill informations below
   ```
   COOKIE_SECRET = secret code for session
   KAKAO_ID = you kakao developers Rest API key
   ```
2. run command below on terminal
   ```sh
   node server
   ```
3. Access to [http://localhost:4000/](http://localhost:4000/)

<br/>



<!-- USAGE EXAMPLES -->
<!--
	# Usage
	Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.
-->



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
<br/>



<!-- CONTACT -->
## Contact

<img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/gmail.svg#gh-light-mode-only" alt="Gmail" align=left width=24 height=24><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/gmail.svg#gh-dark-mode-only" alt="Gmail" align=left width=20 height=20> salut.juilllet@gmail.com


<img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg#gh-light-mode-only" alt="gitHub" align=left width=24 height=24><img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg#gh-dark-mode-only" alt="gitHub" align=left width=20 height=20> [https://github.com/salutJuillet](https://github.com/salutJuillet)




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[NodeJS-url]: https://nodejs.org/
[Sequelize-url]: https://sequelize.org/
[Nunjucks-url]: https://mozilla.github.io/nunjucks/
