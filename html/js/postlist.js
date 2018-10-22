var ProductList = new Vue({
    el: '#productlist',
    data: {
        productUrl: 'http://localhost:7398/manage/api/product/GetProductList',
        productStatusUrl: 'http://localhost:7398/manage/api/product/UpdateProductOnlineStatus',
        productModel: {
            page: 1,
            count: 50,
            keyword: ''
        },
        productStatus: {
            productid: '',
            enable: ''
        },
        msg: '',
        productlistdata: []
    },
    methods: {
        searchproduct: function () {
            var vm = this
            vm.msg = ''
            $.ajax({
                url: vm.productUrl,
                type: 'POST',
                data: vm.productModel,
                success: function (data) {
                    vm.msg = 'ok';
                    vm.productlistdata = data.data;
                },
                error: vm.requestError
            })
        },
        updateproductstatus: function (productid, enable) {
            var vm = this
            vm.productid = productid
            vm.enable = enable
            vm.msg = ''
            $.ajax({
                url: vm.productStatusUrl,
                type: 'POST',
                data: vm.productStatus,
                success: function (data) {
                    vm.msg = 'ok';
                },
                error: vm.requestError
            })
        },
        requestError: function (xhr, errorType, error) {
            this.msg = xhr.responseText
        }
    },
    components: {
        props: ['productlistdata'],
        'ProductTable': {
            template: '<table class="ui celled table sortable">\
                            <thead>\
                                <tr>\
                                    <th class="center aligned no-sort">商品圖片</th>\
                                    <th class="no-sort">商品名稱</th>\
                                    <th class="collapsing center aligned">訂單數</th>\
                                    <th class="collapsing center aligned" >成團數</th>\
                                    <th class="center aligned">狀態</th>\
                                    <th class="center aligned no-sort">操作</th>\
                                </tr>\
                             </thead>\
                        </table>',
        },
        'ProductItem': {
            props: ['item'],
            template: '<tr>\
                        <td class="collapsing">\
                            <div class="ui tiny image"><img class="listCover" src="images/blankImg.png" style="background-image:url(http://fakeimg.pl/400x400/?text=product)" alt=""></div>\
                        </td>\
                        <td>\
                            <div class="postDetail">\
                                <p>{{ item.ProductName }}</p>\
                            </div>\
                        </td>\
                        <td class="center aligned">{{ item.LimitQty}}</td>\
                        <td class="center aligned">{{ item.UnConfirmCnt }}</td>\
                        <td class="collapsing center aligned"><a href="javasript:ProductList.updateproductstatus(item.Productid,item.Status);return false;" class="ui small button red"><i class="minus circle icon"></i>{{ item.Status == 1 ? "上架" : "下架" }}</a></td>\
                        <td class="collapsing">\
                            <p><a class="ui small button teal" href="msgList.html"><i class="unhide icon"></i>訂單查詢</a><a class="ui small button blue" href="proEdit.html"><i class="edit icon"></i>編輯</a></p>\
                        </td>\
                    </tr>'
        },
        'ProductActive': {
            template: '<div class="ui small breadcrumb"><a class="section">首頁</a><i class="right chevron icon divider"></i>\
                            <div class="active section text dark">商品管理</div>\
                       </div>',
        },
        'ProductUihead': {
            template: '<h1 class="ui header">商品管理</h1>',
        },
        'ProductFunction': {
            template: '<div class="ui middle aligned grid" id="topFunction">\
                            <div class="left floated eight wide column">\
                                <div class="ui form">\
                                    <div class="fields two">\
                                        <cproduct-select></cproduct-select>\
                                        <cproduct-search></cproduct-search>\
                                    </div>\
                                </div>\
                            </div>\
                            <product-add></product-add>\
                       </div>',
            components: {
                'CproductSelect': {
                        template: '<div class="field">\
                                        <select class="ui fluid search dropdown" name="proType">\
                                            <option value="">商品類別</option>\
                                            <option value="1">上衣</option>\
                                            <option value="2">褲子</option>\
                                        </select>\
                                   </div>'
                },
                'CproductSearch': {
                        props: ['keyword'],
                        template: '<div class="field">\
                                        <div class="ui action left icon input"><i class="search icon"></i>\
                                            <input type="text" v-bind:key-word="keyword" @input="change($event.target.value)" placeholder="請輸入關鍵字" />\
                                            <button class="ui teal button" onclick="ProductList.searchproduct()">搜尋</button>\
                                        </div>\
                                   </div>',
                        methods: {
                            change(code) {
                                ProductList.productModel.keyword = code;
                            }
                        }
                },
                'ProductAdd': {
                        template: '<div class="right aligned eight wide column"><a class="ui meia button" href="proAdd.html">新增商品</a></div>\
                                   </div >'
                }
            }
        },
    }
})