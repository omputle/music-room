<template>
    <div class="panel_item">
        <h3>settings</h3>
        <small v-for="(setting, index) in settings" :key="index">
            <p>{{index}} - {{setting}}</p>
        </small>
    </div>
</template>

<script>

export default {
    name: 'Settings',
    props: {
        settings: Object
    }
}
</script>
<style scoped>

</style>