<div>
    <div class="menu-bar">
        <div class="container-fluid d-flex">
            <ul class="menu-list mr-auto">
                <?php if (in_array(1, $user['group_permission'])) : ?>
                    <li id="dashboard"><a href="dashboard"><i class="fa fa-area-chart" aria-hidden="true"></i><b> Trang Chủ</b></a></li>
                <?php endif; ?>
                <?php if (in_array(2, $user['group_permission'])) : ?>
                    <li id="product"><a href="product"><i class="fa fa-cube" aria-hidden="true"></i><b> Sản phẩm</b></a></li>
                <?php endif; ?>
                <?php if (in_array(3, $user['group_permission'])) : ?>
                    <li id="orders"><a href="orders"><i class="fa fa-pencil-square-o" aria-hidden="true"></i><b> Hóa đơn</b></a></li>
                <?php endif; ?>
                <?php if (in_array(4, $user['group_permission'])) : ?>
                    <li id="customer"><a href="customer"><i class="fa fa-users"></i><b> Khách hàng</b></a></li>
                <?php endif; ?>
                <?php if (in_array(5, $user['group_permission'])) : ?>
                    <li id="import"><a href="import"><i class="fa fa-truck"></i><b> Nhập kho</b></a></li>
                <?php endif; ?>
                <?php if (in_array(6, $user['group_permission'])) : ?>
                    <li id="inventory"><a href="inventory"><i class="fa fa-cubes" aria-hidden="true"></i><b> Tồn kho</b></a></li>
                <?php endif; ?>
                <?php if (in_array(7, $user['group_permission'])) : ?>
                    <li id="revenue"><a href="revenue"><i class="fa fa-bar-chart" aria-hidden="true"></i><b> Doanh số</b></a></li>
                <?php endif; ?>
                <?php if (in_array(9, $user['group_permission'])) : ?>
                    <li id="profit"><a href="profit"><i class="fa fa-usd"></i><b> Lợi nhuận</b></a></li>
                <?php endif; ?>
                <?php if (in_array(10, $user['group_permission'])) : ?>
                    <li id="config"><a href="setting"><i class="fa fa-cog" aria-hidden="true"></i><b> Thiết lập</b></a></li>
                <?php endif; ?>
            </ul>
            <div class="menu-pos text-right ">
                <div class="dashboard">
                    <a href="pos"><i class="fa fa-shopping-basket" aria-hidden="true"></i><b> Bán Hàng</b></a>
                </div> 
            </div>
        </div>
    </div>
</div>