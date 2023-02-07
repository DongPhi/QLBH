<div class="row">
    <div class="col-sm-10">
        <div id="report-content" >
            <div class="content-text">
                <h3>Báo cáo doanh thu hôm nay</h3>
                <div class="revenue money-left">
                    <div class="icon-usd"><i class="fa fa-usd" aria-hidden="true"></i></div>
                    <div class="data-usd">
                        <span class="infobox-data-number text-center bill"><?php echo (isset($slsorders)) ? cms_encode_currency_format($slsorders) : '0'; ?> hóa đơn</span>
                        <span class="infobox-data-number text-center money"><?php echo (isset($tongtien)) ? cms_encode_currency_format($tongtien) : '0'; ?></span>
                        <span class="infobox-data-number text-center txt-revenue">Doanh thu thuần</span>
                    </div>
                </div>
                <div class="revenue money-center">
                    <div class="icon-product"><i class="fa fa-bolt" aria-hidden="true"></i></div>
                    <div class="data-usd">
                        <span class="infobox-data-number text-center bill"><?php echo (isset($slsinventory)) ? cms_encode_currency_format($slsinventory) : '0'; ?> hàng tồn</span>
                        <span class="infobox-data-number text-center money"><?php echo (isset($slsorders)) ? cms_encode_currency_format($slsorders) : '0'; ?></span>
                        <span class="infobox-data-number text-center txt-revenue">Sản phẩm</span>
                    </div>
                </div>
                <div class="revenue money-right">
                    <div class="icon-product"><i class="fa fa-info" aria-hidden="true"></i></div>
                    <div class="data-usd">
                        <!-- <span class="infobox-data-number text-center bill">Đang cập nhật</span> -->
                        <span class="infobox-data-number text-center money">Đang cập nhật</span>
                        <!-- <span class="infobox-data-number text-center txt-revenue">Đang cập nhật</span> -->
                    </div>
                </div>
            </div>
        </div>
        <div id="diagram-content">
            <div class="content-text">
                <h3>Sơ đồ doanh thu hàng tháng</h3>
            </div>
        </div>
    </div>
    <div class="col-sm-2">
        <div id="notification-content">
            <h3 class="text-center">Thông báo!</h3>
        </div>
    </div>
</div>