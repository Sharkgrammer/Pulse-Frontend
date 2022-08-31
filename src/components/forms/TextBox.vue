<template>
  <div>


    <input v-if="!multiline" :type='type' :disabled="disabled" :placeholder="placeholder" v-model="textValue"
           :class="disabled ? 'disabled': 'enabled'" :maxlength="max"
           class="h-10 w-full px-3 py-2 border rounded-lg bg-gray-800 text-gray-300 focus:outline-none"/>


    <textarea v-else :disabled="disabled" :placeholder="placeholder" :class="disabled ? 'disabled': 'enabled'"
              v-model="multiValue"
              class="w-full px-3 py-2 border rounded-lg bg-gray-800 text-gray-300 focus:outline-none">
  </textarea>


  </div>
</template>

<script>

export default {
  name: "TextBox",
  props: {
    max: {
      type: Number,
      default: 255
    },
    placeholder: String,
    disabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
    },
    multiline: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      textValue: "",
      multiValue: "",
    }
  },
  mounted() {
    if (this.multiline) {
      this.multiValue = this.value;
    } else {
      this.textValue = this.value;
    }
  },
  watch: {
    textValue() {
      this.$emit('update', this.textValue);
    },
    multiValue() {
      this.$emit('update', this.multiValue);
    }
  }
}
</script>

<style scoped>

.enabled {
  @apply hover:border-accent focus:border-accent border-gray-300;
}

.disabled {
  @apply border-gray-500
}

</style>