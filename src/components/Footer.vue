<template>
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="footer-col">
          <h4>company</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">about us</a></li>
            <li><a href="#">our services</a></li>
            <li><a href="#">privacy policy</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>latest news</h4>
          <ul>
            <li><a href="#">become a host</a></li>
            <li><a href="#">cover for host</a></li>
            <li><a href="#">resources</a></li>
            <li><a href="#">responsibly</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>rentals</h4>
          <ul>
            <li><a href="#">top destination</a></li>
            <li><a href="#">rentals</a></li>
            <li><a href="#">top places</a></li>
            <li><a href="#">top cities</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>follow us</h4>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </div>
  </footer> 
  </template>
  
  <script>
  export default {
    name: 'Footer',
  }
  </script>
  
  <style scoped>
  body{
    line-height: 1.5;
    font-family: 'Montserrat', sans-serif;
    color: white;
}
*{
    margin:0;
    padding:0;
    box-sizing: border-box;
}
.container{
    max-width: 1170px;
    margin:auto;
}
.row{
    display: flex;
    flex-wrap: wrap;
}
ul{
    list-style: none;
}
.footer{
    background-color: #193D4E;
    padding: 50px 0;
    position: relative;
    bottom: 0;
    left:0;
    width: 100%;
}
.footer-col{
    width: 25%;
    padding: 0 15px;
}
.footer-col h4{
    font-size: 20px;
    color: #ffffff;
    text-transform: capitalize;
    margin-bottom: 35px;
    font-weight: 400;
    position: relative;
}
.footer-col h4::before{
    content: '';
    position: absolute;
    left:0;
    bottom: -10px;
    background-color: #20A89C;
    height: 2px;
    box-sizing: border-box;
    width: 50px;
}
.footer-col ul li:not(:last-child){
    margin-bottom: 10px;
}
.footer-col ul li a{
    font-size: 15px;
    text-transform: capitalize;
    color: #ffffff;
    text-decoration: none;
    font-weight: 400;
    color: #bbbbbb;
    display: block;
    transition: all 0.3s ease;
}
.footer-col ul li a:hover{
    color: #ffffff;
    padding-left: 8px;
}
.footer-col .social-links a{
    display: inline-block;
    height: 40px;
    width: 40px;
    background-color: #20A89C;
    margin:0 10px 10px 0;
    text-align: center;
    line-height: 42px;
    border-radius: 50%;
    color: #ffffff;
    transition: all 0.5s ease;
}

.social-links a i{
    font-size: 15px;
}
.footer-col .social-links a:hover{
    color: #193D4E;
    background-color: #ffffff;
}

/*responsive*/
@media(max-width: 767px){
    .footer-col{
        width: 50%;
        margin-bottom: 30px;
    }
}
@media(max-width: 574px){
    .footer-col{
        width: 100%;
    }
}
  </style>