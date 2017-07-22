<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<html lang="en" id="html_content">
  <head>
    <%@ include file="include/header.jsp"%>
    <link rel="stylesheet" href="pagecss/newproject.css" type="text/css" />
    <!-- select2 -->
    <link href="css/select/select2.min.css" rel="stylesheet">
    <!-- select2 -->
    <script src="js/select/select2.full.js"></script>
    <script src="pagejs/newproject.js"></script>
  </head>
  <body class="nav-md">
    <div class="container body" style="display: none;" data-bind="visible: true">
      <div class="main_container">
        <div class="col-md-3 left_col">
          <%@ include file="include/sidemenu.jsp"%>
        </div>
        <!-- top navigation -->
        <div class="top_nav">
          <%@ include file="include/topnav.jsp" %>
        </div>
        <!-- /top navigation -->
        <!-- page content -->
        <div class="right_col" role="main">
          <div class="row">
            <div class="page-title">
              <div class="title_left">
                <h3>Add New Project</h3>
              </div>
              <!-- <div class="title_right">
                <div class="col-md-5 col-sm-5 col-xs-12 form-group pull-right top_search">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Search for...">
                    <span class="input-group-btn">
                              <button class="btn btn-default" type="button">Go!</button>
                          </span>
                  </div>
                </div>
              </div> -->
            </div>
            <div class="clearfix"></div>
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="x_panel">
                <div class="row x_title">
                  <div class="col-md-6">
                    <h2>Project Information <!-- <small>no content</small> --></h2>
                  </div>
                  <div class="col-md-6">
                  </div>
                </div>
                <div class="col-md-12 col-sm-12 col-xs-12">
                  <form class="form-horizontal form-label-left input_mask">
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="project-name">Project Name <span class="required">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input type="text" id="project-name" required="required" class="form-control col-md-7 col-xs-12">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="project-status">Project Status <span class="required">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <select class="select2_single form-control" tabindex="-1" data-bind="options: lsProjectStatus,
                            optionsText: 'statusName',
                            optionsValue: 'statusId',
                            value: selectedStatus"></select>
                      </div>
                    </div>
                  </form>
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