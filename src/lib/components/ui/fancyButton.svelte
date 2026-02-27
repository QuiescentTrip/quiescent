<script lang="ts">
    	type Props = {
            href: string;
            text: string;
    };

    let { href, text }: Props = $props();
</script>
<a {href} target="">
    {text}
    <span class="nav-stripe-1"></span>
    <span class="nav-stripe-2"></span>
    <span class="nav-stripe-3"></span>
</a>
