# Guelcortes — Site Barbearia

Site estático completo para a **Guelcortes Barbearia** (São Rafael, Salvador/BA).

---

## Estrutura de arquivos

```
guelcortes/
├── index.html              ← Página principal
├── assets/
│   ├── css/
│   │   └── style.css       ← Todos os estilos (mobile-first)
│   ├── js/
│   │   └── main.js         ← Animações, menu, slider, lightbox, formulário
│   └── images/
│       ├── logo.png        ← Substituir pelo logo do cliente
│       ├── hero-bg.jpg     ← Foto de fundo do hero
│       ├── about.jpg       ← Foto da seção Sobre
│       └── gallery/        ← Fotos dos cortes (01.jpg, 02.jpg …)
├── README.md
└── .gitignore
```

---

## Como substituir os placeholders por fotos reais

### 1. Foto do Hero (fundo principal)
No `index.html`, localize a tag dentro da seção `<!-- HERO -->`:
```html
<img src="https://placehold.co/1920x1080/..." alt="" class="hero__bg-img">
```
Substitua pelo caminho local:
```html
<img src="assets/images/hero-bg.jpg" alt="" class="hero__bg-img" loading="eager">
```

### 2. Foto da Seção Sobre
```html
<!-- antes -->
<img src="https://placehold.co/600x700/..." alt="...">
<!-- depois -->
<img src="assets/images/about.jpg" alt="Ambiente da Guelcortes" loading="lazy">
```

### 3. Fotos da Galeria
Coloque as fotos em `assets/images/gallery/` (ex: `01.jpg`, `02.jpg`…).  
Para cada item da galeria no HTML, troque o `href` (lightbox) e o `src` (thumbnail):
```html
<!-- antes -->
<a href="https://placehold.co/900x1100/..." ...>
  <img src="https://placehold.co/450x550/..." alt="...">

<!-- depois -->
<a href="assets/images/gallery/01.jpg" ...>
  <img src="assets/images/gallery/01.jpg" alt="Corte masculino moderno" loading="lazy">
```

**Dica:** Use imagens no formato **WebP** para melhor performance (máx. 500KB cada).

---

## Como editar textos e preços

Abra `index.html` e localize a seção desejada pelos comentários:
- `<!-- HERO -->` — título principal e subtítulo
- `<!-- SERVIÇOS -->` — preços e descrições dos cards
- `<!-- CONTATO -->` — endereço, horário, WhatsApp, e-mail
- `<!-- FOOTER -->` — créditos e links

### Alterar preços
Nos cards de serviço, atualize o texto exibido **e** a URL do WhatsApp:
```html
<!-- Preço exibido -->
<span class="service-card__price">R$ 20,00</span>

<!-- URL do botão Agendar (alterar o valor no parâmetro text) -->
<a href="https://wa.me/5571984059423?text=...Corte%20Masculino*%20(R%24%2020%2C00)...">
```

---

## Como editar cores e fontes

Todas as cores estão em variáveis CSS no topo de `assets/css/style.css`:
```css
:root {
  --c-silver-b: #C0C0C0;  /* Prata base (acento principal) */
  --c-silver-l: #E8E8E8;  /* Prata claro */
  --c-primary: #1a1a1a;  /* Preto profundo */
}
```
Altere apenas os valores das variáveis — o site inteiro atualiza automaticamente.

---

## Como fazer deploy no Netlify

**Opção 1 — Arrastar e soltar (mais rápido):**
1. Acesse [netlify.com/drop](https://app.netlify.com/drop)
2. Arraste a pasta `guelcortes/` para a área indicada
3. O site vai ao ar em segundos com SSL automático
4. URL gratuita: `guelcortes.netlify.app`

**Opção 2 — Via GitHub (deploy contínuo):**
1. Crie um repositório no GitHub e envie a pasta
2. No Netlify: **Add new site → Import an existing project**
3. Conecte o repositório GitHub
4. Build command: *(deixar vazio)*
5. Publish directory: `/` (raiz do repositório)
6. Clique em **Deploy site**

### Domínio próprio
No painel Netlify: **Domain settings → Add custom domain**  
Ex: `guelcortes.com.br`

---

## Checklist antes de entregar ao cliente

- [ ] Substituir todos os placeholders por fotos reais
- [ ] Confirmar horário de funcionamento real (atualmente: Seg–Sáb 9h–19h)
- [ ] Confirmar endereço completo (atualmente: São Rafael, Salvador–BA)
- [ ] Testar todos os botões WhatsApp no celular
- [ ] Testar formulário de contato (abre WhatsApp corretamente)
- [ ] Testar menu mobile (hamburguer) em telas pequenas
- [ ] Verificar se as fotos estão otimizadas (< 500KB cada)
- [ ] Atualizar `<meta property="og:url">` com o domínio final

---

## Bibliotecas utilizadas

| Biblioteca | Versão | Uso |
|---|---|---|
| [GLightbox](https://biati-digital.github.io/glightbox/) | latest | Lightbox da galeria |
| [Swiper.js](https://swiperjs.com/) | 11 | Slider de depoimentos |
| [Google Fonts](https://fonts.google.com/) | — | Poppins + Inter |

Todas carregadas via CDN — nenhuma instalação necessária.

---

**Contato do cliente:** guelcortes@gmail.com · (71) 98405-9423 · [@_guelcortes](https://www.instagram.com/_guelcortes/)
