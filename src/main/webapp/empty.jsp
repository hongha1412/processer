<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<html lang="en" id="html_content">
  <head>
    <%@ include file="include/header.jsp"%>
    <link rel="stylesheet" href="pagecss/newproject.css" type="text/css" />
    <script src="pagejs/newproject.js"></script>
  </head>
  <body class="nav-md">
    <div class="container body">
      <div class="main_container">
        <div class="col-md-3 left_col">
          <%@ include file="include/sidemenu.jsp"%>
        </div>
        <!-- top navigation -->
        <div class="top_nav">
          <div class="nav_menu">
            <nav class="" role="navigation">
              <div class="nav toggle">
                <a id="menu_toggle"><i class="fa fa-bars"></i></a>
              </div>
            </nav>
          </div>
        </div>
        <!-- /top navigation -->
        <!-- page content -->
        <div class="right_col" role="main">
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="dashboard_graph">
                <div class="row x_title">
                  <div class="col-md-6">
                    <h3>Empty <small>no content</small></h3>
                  </div>
                  <div class="col-md-6">
                  </div>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12">
                  ...
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </div>
          <br />
          <!-- footer content -->
          <footer>
            <div class="copyright-info">
              <p class="pull-right">Gentelella - Bootstrap Admin Template by <a href="https://colorlib.com">Colorlib</a>      
              </p>
            </div>
            <div class="clearfix"></div>
          </footer>
          <!-- /footer content -->
        </div>
        <!-- /page content -->
      </div>
    </div>
    <div id="custom_notifications" class="custom-notifications dsp_none">
      <ul class="list-unstyled notifications clearfix" data-tabbed_notifications="notif-group">
      </ul>
      <div class="clearfix"></div>
      <div id="notif-group" class="tabbed_notifications"></div>
    </div>
    <!-- /footer content -->
  </body>
</html>