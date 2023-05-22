<template>
 <component :is="`hfex-icon-${name}`" :width="size" :height="size" :color="color" @click.native="$emit('click')"></component>
</template>

<script>
 <% for (const comp in icons ) { %>import <%= icons[comp].componentName %> from '~icons/hfex-icon/<%= comp %>'; 
 <% } %>
    export default{
        name: 'HfexIcon',
        components:{
        <% for (const comp in icons ) { %>  <%= icons[comp].componentName %>, 
        <% } %>
        },
        props: {
            name: {
                type: String,
                default: 'home'
            },
            size: {
                type: String,
                default: '28px'
            },
            color: {
                type: String,
                default: '#000'
            }
        },
        emits: {
           click: null
        }
    }
</script>