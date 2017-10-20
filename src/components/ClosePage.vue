<template lang="pug">
  .close-page
    a(href="javascript:window.close()" @focus="blur()" class="confirm-btn") 确认完成
</template>
<script>
export default {
    name: 'close-page'
}
</script>
<style lang="scss">
.close-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    line-height: 50px;
    margin-top: 20px;
    .confirm-btn {
        display: inline-block;
        width: 100px;
        background-color: #20A0FF;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #ffffff;
        text-decoration: none;
    }
}
</style>

