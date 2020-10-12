<template>
    <v-form dense>
        <v-text-field
            solo
            dense
            label="search"
        >
        </v-text-field>
    </v-form>
</template>

<script>
export default {
    name: 'Searchbox',
    data() {
        return {
            label: 'search'
        }
    }
}
</script>