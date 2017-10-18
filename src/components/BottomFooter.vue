<template lang='pug'>
    .footer
        footer
            | 未经zhaopin.com 同意，不得转载本网站之所有招聘信息及作品 智联招聘网版权所有@1997-{{year}}
</template>
<script>
export default {
    name: 'bottom-footer',
    computed:{
        year(){
            return this.$moment().format('YYYY')
        }
    }
}
</script>
<style lang="scss">
.footer {
    display: flex;
    justify-content: center;
    margin: 100px 0 40px 0;
    font-size: 12px;
    color: #8492A6;
}
</style>

