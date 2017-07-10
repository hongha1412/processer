<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<html lang="en" id="html_content">

<head>
  <%@ include file="include/header.jsp"%>
  <link rel="stylesheet" href="pagecss/login.css" type="text/css" />
  <script src="pagejs/login.js"></script>
</head>

<body style="background:#F7F7F7; display: none" data-bind="visible: true">

  <div class="">
    <a class="hiddenanchor" id="toregister"></a>
    <a class="hiddenanchor" id="tologin"></a>

    <div id="wrapper">
      <div id="login" class="animate form">
        <section class="login_content">
          <form data-bind="submit: submit">
          <!-- <form action="LoginServlet" method=post> -->
            <h1>Login Form</h1>
            <div>
              <input type="text" class="form-control" placeholder="Username" data-bind="value: userName" required="true" />
            </div>
            <div>
              <input type="password" class="form-control" placeholder="Password" data-bind="value: password" required="true" />
            </div>
            <div>
              <button type="submit" class="btn btn-default submit">Log in</button>
              <a class="reset_pass" href="#">Lost your password?</a>
            </div>
            <div class="clearfix"></div>
            <div class="separator">

              <div class="clearfix"></div>
              <br />
              <div>
                <h1><img class="plimo_icon" src="images/Plimo_icon.ico" /> Project Processer</h1>

                <p class="hide">Â©2015 All Rights Reserved. Gentelella Alela! is a Bootstrap 3 template. Privacy and Terms</p>
              </div>
            </div>
          </form>
          <!-- form -->
        </section>
        <!-- content -->
      </div>
    </div>
  </div>

</body>

</html>
