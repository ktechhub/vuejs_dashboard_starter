

<template>
    <button type="submit" :disabled="isLoading" class="btn btn-primary w-100">
        {{ label }}
        <span v-show="isLoading" class="spinner-border spinner-border-sm"></span>
    </button>
</template>
<script>
export default {
    name: "ButtonComponent",
    props: {
        label: String,
        isLoading: Boolean,
        width: String,
        bgcolor: String,
        btnClass: String,
    }
}
</script>