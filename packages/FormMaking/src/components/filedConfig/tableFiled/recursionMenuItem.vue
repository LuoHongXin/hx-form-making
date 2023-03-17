<template functional>
  <a-sub-menu>
    <a-checkbox :checked="props.data.check" :indeterminate="props.data.indeterminate" slot="title" @change="props.change(props.data)">
      {{ props.data[props.replaceFiled.label] }}
    </a-checkbox>
    <template v-for="item in props.data[props.replaceFiled.children]">
      <RecursionMenuItem
        v-if="item[props.replaceFiled.children] && item[props.replaceFiled.children].length > 0"
        :key="item[props.replaceFiled.key] + item.check"
        :data="item"
        :replaceFiled="props.replaceFiled"
        :change="props.change"
      />
      <a-sub-menu v-else class="no-children" :key="item[props.replaceFiled.key] + item.check">
        <a-checkbox
          slot="title"
          :checked="item.check"
          :indeterminate="item.indeterminate"
          @change="props.change(item, props.data)"
          @click="e => e.stopPropagation()"
        >
          {{ item[props.replaceFiled.label] }}
        </a-checkbox>
      </a-sub-menu>
    </template>
  </a-sub-menu>
</template>
