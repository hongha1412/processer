<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<html lang="en" id="html_content">
<head>
  <%@ include file="include/header.jsp"%>
  <link rel="stylesheet" href="pagecss/index.css" type="text/css" />
  <script src="pagejs/index.js"></script>
</head>
<body style="background: #F7F7F7">
  <div id="wrapper">
    <section class="header">
      <h1><img src="images/Plimo_icon.ico" /> Project Processer</h1>
    </section>
  </div>
  <div class="right_col" role="main" style="display: none;" data-bind="visible: true">
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="dashboard_graph">
          <div class="row x_title">
            <div class="col-md-6">
              <h3>Project List</h3>
            </div>
          </div>
          <div class="col-md-12 col-sm-12 col-xs-12">
            <!-- Start project list -->
            <div class="x_content">

              <p class="hide">Simple table with project listing with progress and
                editing options</p>

              <!-- start project list -->
              <p data-bind="projectList() ? projectList.length <= 0 : true"></p>
              <div data-bind="if: projectList() ? projectList.length <= 0 : true">
                <h2>No project found</h2>
              </div>
              <table class="table table-striped projects" data-bind="if: projectList.length > 0">
                <thead>
                  <tr>
                    <th style="width: 1%">#</th>
                    <th style="width: 35%">Project Name</th>
                    <th>Team Capacity</th>
                    <th style="width: 20%">Status</th>
                    <th style="width: 20%">#Edit</th>
                  </tr>
                </thead>
                <tbody data-bind="foreach: projectList">
                  <tr>
                    <td data-bind="text: pjId"></td>
                    <td><a data-bind="text: pjName"></a> <br /> <small>Received </small><small data-bind="text: pjReceiveDate"></small></td>
                    <td data-bind="text: pjCapacity"></td>
                    <td>
                      <button type="button" class="btn btn-success btn-xs" data-bind="text: pjType"></button>
                    </td>
                    <td>
                      <a href="#" class="btn btn-primary btn-xs"><i class="fa fa-folder"></i> View </a> 
                      <a href="#" class="btn btn-info btn-xs hide"><i class="fa fa-pencil"></i> Edit </a> 
                      <a href="#" class="btn btn-danger btn-xs hide"><i class="fa fa-trash-o"></i> Delete </a>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- end project list -->

            </div>
            <!-- End project list -->
          </div>
          <div class="clearfix"></div>
        </div>
        <div class="pull-left bottom_control" data-bind="visible: isLoggedIn()">
            <button type="button" class="btn btn-primary" data-bind="click: newProject">New Project</button>
        </div>
        <div class="pull-right bottom_control" data-bind="visible: !isLoggedIn()">
          <button type="button" class="btn btn-link" data-bind="click: adminLogin">Admin Login</button>
        </div>
      </div>
      <br />
    </div>
  </div>
</body>
</html>
