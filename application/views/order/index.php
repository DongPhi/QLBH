<div class="products" style="margin-top:20px">
    <div class="row">
        <div class="col-2">
            <div class="form-group prd-search">
                <h4 class="txt-search p-3">Tìm kiếm</h4>
                <div class="p-3">
                    <input type="text" class="form-control" placeholder="Theo mã hóa đơn" id="order-search">
                    <select class="form-control mt-3" id="search-option-1">
                        <option value="0">Hóa đơn</option>
                        <option value="1">Hóa đơn đã xóa</option>
                        <option value="2">Hóa đơn còn nợ</option>
                    </select>
                    <div class="input-daterange input-group mt-3" id="datepicker">
                        <input type="text" class="input-sm form-control" id="search-date-from" placeholder="Từ ngày" name="start"/><span class=""></span>
                        <input type="text" class="input-sm form-control" id="search-date-to" placeholder="Đến ngày" name="end"/>
                    </div>
                    <div>
                        <button type="button" class="btn btn-primary btn-large btn-ssup mt-3"  onclick="cms_paging_order(1)">
                            <i class="fa fa-search"></i> Tìm kiếm
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
        <div class="col-10">
            <div class="product-main-header">
                <div class="txt-prod-left">
                    <h3 class="mt-3">Hóa đơn</h3>
                </div>
                <div class="txt-prod-right">
                    <div class="d-flex flex-row-reverse">
                        <div class="btn-group mt-3">
                            <button type="button" onclick="cms_order_week()" class="btn btn-success mr-1">Tuần</button>
                            <button type="button" onclick="cms_order_month()" class="btn btn-success mr-1">Tháng</button>
                            <button type="button" onclick="cms_order_quarter()" class="btn btn-success">Quý</button>
                        </div>
                    </div>       
                </div>
            </div>
            <div class="orders-main-body">
            </div>
        </div>
    </div>

</div>
