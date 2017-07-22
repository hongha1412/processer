<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<html lang="en" id="html_content">
  <head>
    <%@ include file="include/header.jsp"%>
    <link rel="stylesheet" href="pagecss/typemanage.css" type="text/css" />
    <link href="js/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <!-- Datatables-->
        <script src="js/datatables/jquery.dataTables.min.js"></script>
        <script src="js/datatables/dataTables.bootstrap.js"></script>
        <script src="js/datatables/dataTables.buttons.min.js"></script>
        <script src="js/datatables/buttons.bootstrap.min.js"></script>
        <script src="js/datatables/jszip.min.js"></script>
        <script src="js/datatables/pdfmake.min.js"></script>
        <script src="js/datatables/vfs_fonts.js"></script>
        <script src="js/datatables/buttons.html5.min.js"></script>
        <script src="js/datatables/buttons.print.min.js"></script>
        <script src="js/datatables/dataTables.fixedHeader.min.js"></script>
        <script src="js/datatables/dataTables.keyTable.min.js"></script>
        <script src="js/datatables/dataTables.responsive.min.js"></script>
        <script src="js/datatables/responsive.bootstrap.min.js"></script>
        <script src="js/datatables/dataTables.scroller.min.js"></script>
    <script src="pagejs/typemanage.js"></script>
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
                <h3>Type Manage</h3>
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
                <!-- <div class="row x_title">
                  <div class="col-md-6">
                    <h2>Status List</h2>
                  </div>
                  <div class="col-md-6">
                  </div>
                </div> -->
                <div class="col-md-12 col-sm-12 col-xs-12">
                  <form class="form-horizontal form-label-left input_mask" data-bind="submit: submit">
                    <div class="col-md-6 col-xs-12" data-bind="with: listType">
                      <h4 class="x_title">Type List</h4>
                      <table id="type_list" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%" data-bind="igGrid: {
                        primaryKey: 'typeId',
                        width: '100%',
                        columns: [
                            {headerText: 'Type ID', key: 'typeId', dataType: 'number', width: '30%'},
                            {headerText: 'Type Name', key: 'typeName', dataType: 'string', width: '70%'}
                        ],
                        dataSource: lsType,
                        features: [
                            {
                                name: 'Paging',
                                pageSize: 10
                            },
                            {
                                name: 'Selection',
                                mode: 'row',
                                multipleSelection: false,
                                activation: true,
                                rowSelectionChanged: selectionChanged
                            },
                            {
                                name: 'Updating',
                                enableAddRow: false,
                                enableDeleteRow: false,
                                editMode: 'none'
                            }
                        ]
                      }">
                      </table>
                    </div>
                    <div class="col-md-6 col-xs-12" id="status_info">
                      <h4 class="x_title">Type Information</h4>
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="type_id">Type Id 
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input type="text" id="type_id" disabled="disabled" data-bind="value: typeId" placeholder="Type Id" class="form-control col-md-7 col-xs-12">
                        </div>
                      </div>
                      <div class="form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="type_name">Type Name <span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input type="text" id="type_name" required="required" data-bind="value: typeName" placeholder="Type Name" class="form-control col-md-7 col-xs-12">
                        </div>
                      </div>
                      <div class="ln_solid"></div>
                      <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                        <button type="button" data-bind="click: newType" class="btn btn-round btn-primary control-button">New</button>
                        <button type="submit" class="btn btn-round btn-success control-button">Submit</button>
                        <button type="button" data-bind="click: deleteType, enable: !isNew()" class="btn btn-round btn-danger control-button">Delete</button>
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