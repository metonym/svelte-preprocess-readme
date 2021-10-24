<pre class="language-svelte"><code>{@html `<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">></span></span><span class="token script"><span class="token language-javascript">
  <span class="token keyword">import</span> <span class="token punctuation">{</span> onMount <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"svelte"</span><span class="token punctuation">;</span>

  <span class="token keyword">let</span> text <span class="token operator">=</span> <span class="token string">''</span><span class="token punctuation">;</span>

  <span class="token function">onMount</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    text <span class="token operator">=</span> <span class="token string">"Component mounted!"</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>h1</span><span class="token punctuation">></span></span><span class="token language-javascript"><span class="token punctuation">{</span>text<span class="token punctuation">}</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>h1</span><span class="token punctuation">></span></span>

<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>style</span><span class="token punctuation">></span></span><span class="token style"><span class="token language-css">
  <span class="token selector">h1</span> <span class="token punctuation">{</span>
    <span class="token property">color</span><span class="token punctuation">:</span> blue<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>style</span><span class="token punctuation">></span></span>
`}</code></pre><div class="svelte"><h1>{text}</h1></div>

<script>import { onMount } from "svelte";let text = '';onMount(() => {text = "Component mounted!"});</script>
<style>
  h1 {
    color: blue;
  }
</style>