(() => {
  const STORAGE_KEY = "passeios_miguel_site_config_v1";
  const DISMISS_NOTICE_KEY = "passeios_miguel_aviso_oculto_sessao";
  const DISMISS_XMAS_TICKER_KEY = "passeios_miguel_faixa_natal_oculta_sessao";
  const XMAS_TICKER_START_KEY = "passeios_miguel_faixa_natal_inicio_v1";
  const XMAS_TICKER_DURATION_SEC = 28;
  const XMAS_MUSIC_MUTED_KEY = "passeios_miguel_natal_musica_silenciada_v1";
  const XMAS_MUSIC_TIME_KEY = "passeios_miguel_natal_musica_tempo_v1";
  const XMAS_MUSIC_INDEX_KEY = "passeios_miguel_natal_musica_indice_v1";

  const FRASE_NATAL_SUPERIOR =
    "O Natal não se mede pelo tamanho das luzes, mas pelo calor das pessoas que aquecem o coração e tornam cada encontro numa memória para guardar.";

  const TEXTO_FAIXA_DIAGONAL_NATAL = "Feliz Natal & Feliz 2027";

  const PLAYLIST_NATAL_PADRAO = [
    "audio/musica1.mp3",
    "audio/musica2.mp3",
    "audio/musica3.mp3",
    "audio/musica4.mp3",
    "audio/musica5.mp3"
  ];

  const CONFIG_PADRAO = {
    tema: "normal", // "normal" | "natal"
    natal: {
      imagemCabecalhoUrl: "",
      textoDiagonal: TEXTO_FAIXA_DIAGONAL_NATAL,
      musicaUrl: "",
      musicasUrl: [...PLAYLIST_NATAL_PADRAO]
    },
    avisoGlobal: {
      ativo: false,
      texto: "Edição especial de Natal no ar — lugares limitados!",
      linkTexto: "Ver passeios",
      linkHref: "passeios.html"
    },
    integracao: {
      ativo: false,
      endpointConfig: "https://api.passeiosdomiguel.com/api/site-config"
    }
  };

  function injetarEstilosNatalRefinados() {
    if (document.getElementById("pm-natal-refinado-style")) return;
    const style = document.createElement("style");
    style.id = "pm-natal-refinado-style";
    style.textContent = `
      /* Garante contraste nítido no título da marca no rodapé */
      .footer-container .f-brand h2 {
        color: #ffffff !important;
        opacity: 1 !important;
      }

      /* Menu lateral fixo em desktop, sem zonas brancas nem barra de scroll */
      #menu-lateral {
        position: fixed !important;
        top: 0;
        left: 0;
        bottom: 0;
        width: 250px;
        height: 100vh !important;
        overflow-y: auto !important;
        overflow-x: hidden !important;
        scrollbar-width: none;
        -ms-overflow-style: none;
        z-index: 1000;
      }

      #menu-lateral::-webkit-scrollbar {
        width: 0;
        height: 0;
        display: none;
      }

      /* Em ecrãs estreitos (tablet / mobile / janela reduzida), não bloqueia o ecrã inteiro */
      @media (max-width: 1024px) {
        #menu-placeholder {
          width: 100% !important;
          position: relative;
          z-index: 20;
        }

        #menu-lateral {
          position: relative !important;
          top: auto !important;
          left: auto !important;
          right: auto !important;
          bottom: auto !important;
          width: 100% !important;
          height: auto !important;
          min-height: 0 !important;
          max-height: none !important;
          overflow: visible !important;
          z-index: 20 !important;
        }

        main {
          margin-left: 0 !important;
          width: 100% !important;
          position: relative;
          z-index: 1;
        }
      }

      /* Remove completamente o submenu flutuante problemático */
      #menu-lateral li.dropdown .dropdown-content,
      #menu-lateral li.dropdown .fa-chevron-right {
        display: none !important;
      }

      /* Separação clara entre o logo e o primeiro botão */
      #menu-lateral .logo-container {
        margin-bottom: 22px !important;
      }

      /* Assinatura discreta com RNAAT no fundo do menu */
      .pm-rnaat-rodape-menu {
        margin-top: 12px;
        padding-top: 8px;
        text-align: center;
        font-size: 0.7rem;
        letter-spacing: 0.08em;
        color: rgba(255, 255, 255, 0.72);
        font-weight: 600;
      }

      html[data-tema="natal"] .pm-rnaat-rodape-menu {
        color: #f6df9e;
      }

      /* Elementos decorativos de Natal só aparecem quando html[data-tema="natal"] */
      html:not([data-tema="natal"]) .pm-natal-only,
      html:not([data-tema="natal"]) #pm-faixa-natal,
      html:not([data-tema="natal"]) #pm-efeito-natal,
      html:not([data-tema="natal"]) #pm-sobreposicao-natal-cabecalho,
      html:not([data-tema="natal"]) #pm-cenas-natal,
      html:not([data-tema="natal"]) #pm-faixa-diagonal-natal,
      html:not([data-tema="natal"]) #pm-rasto-rato-natal {
        display: none !important;
      }

      html[data-tema="natal"],
      html[data-tema="natal"] body {
        overflow-x: clip;
      }

      html[data-tema="natal"] {
        --pm-natal-ouro: #e2b857;
        --pm-natal-pinheiro: #14452f;
        --pm-natal-bordeaux: #8f1d2c;
      }

      /* Faixa diagonal no topo da página */
      html[data-tema="natal"] #pm-faixa-diagonal-natal {
        position: absolute;
        top: 38px;
        right: -56px;
        width: 270px;
        padding: 8px 16px;
        transform: rotate(35deg);
        transform-origin: center;
        z-index: 1050;
        pointer-events: none;
        user-select: none;
        overflow: hidden;
        background: linear-gradient(135deg, #fbbf24 0%, #d97706 55%, #92400e 100%) !important;
        border-top: 1.5px solid #fffbeb !important;
        border-bottom: 1.5px solid #fffbeb !important;
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.32), 0 0 18px rgba(251, 191, 36, 0.45);
        display: flex !important;
        align-items: center;
        justify-content: center;
        animation: pmPulsoFaixaDiagonal 3.6s ease-in-out infinite alternate;
      }

      html[data-tema="natal"] #pm-faixa-diagonal-natal::before {
        content: "";
        position: absolute;
        top: 0;
        left: -75%;
        width: 55%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.48) 50%,
          transparent 100%
        );
        transform: skewX(-20deg);
        animation: pmBrilhoFaixaDiagonal 4.2s ease-in-out infinite;
      }

      html[data-tema="natal"] .pm-faixa-diagonal-texto {
        position: relative;
        z-index: 1;
        color: #ffffff !important;
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        white-space: nowrap;
        text-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
      }

      @keyframes pmBrilhoFaixaDiagonal {
        0% {
          left: -75%;
        }
        55%, 100% {
          left: 145%;
        }
      }

      @keyframes pmPulsoFaixaDiagonal {
        0% {
          box-shadow: 0 10px 24px rgba(15, 23, 42, 0.28), 0 0 12px rgba(251, 191, 36, 0.28);
        }
        100% {
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.34), 0 0 22px rgba(251, 191, 36, 0.58);
        }
      }

      @media (max-width: 640px) {
        html[data-tema="natal"] #pm-faixa-diagonal-natal {
          top: 32px;
          right: -68px;
          width: 224px;
          padding: 6px 12px;
        }

        html[data-tema="natal"] .pm-faixa-diagonal-texto {
          font-size: 0.62rem;
        }
      }

      /* Luzes amarelas e pequenas bolas natalícias presas à faixa de cima */
      html[data-tema="natal"] .pm-penduricalhos-faixa {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -13px;
        height: 15px;
        display: flex;
        justify-content: space-around;
        align-items: flex-start;
        padding: 0 24px;
        pointer-events: none;
        user-select: none;
        z-index: 4;
      }

      html[data-tema="natal"] .pm-penduricalho-item {
        position: relative;
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        transform-origin: top center;
        animation: pmPendularLeve var(--pm-pend-dur, 2.6s) ease-in-out var(--pm-pend-delay, 0s) infinite alternate;
      }

      html[data-tema="natal"] .pm-penduricalho-item::before {
        content: "";
        width: 1px;
        height: 4px;
        background: rgba(254, 240, 138, 0.75);
      }

      html[data-tema="natal"] .pm-luz-amarela-faixa {
        width: 7px;
        height: 9px;
        border-radius: 50% 50% 45% 45%;
        background: #fde047;
        box-shadow: 0 0 9px rgba(253, 224, 71, 0.95), 0 0 15px rgba(250, 204, 21, 0.65);
      }

      html[data-tema="natal"] .pm-bola-faixa {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: radial-gradient(circle at 30% 30%, #fef08a 0%, #eab308 55%, #a16207 100%);
        box-shadow: 0 0 7px rgba(250, 204, 21, 0.55);
      }

      html[data-tema="natal"] .pm-bola-faixa.cor-rubi {
        background: radial-gradient(circle at 30% 30%, #fca5a5 0%, #dc2626 58%, #7f1d1d 100%);
        box-shadow: 0 0 7px rgba(220, 38, 38, 0.55);
      }

      @keyframes pmPendularLeve {
        0% {
          transform: rotate(-5deg);
        }
        100% {
          transform: rotate(5deg);
        }
      }

      /* Botões de música de Natal na faixa */
      html[data-tema="natal"] .pm-controles-musica-faixa {
        position: relative;
        z-index: 6;
        margin-right: 8px;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        flex-shrink: 0;
      }

      html[data-tema="natal"] .pm-musica-natal-btn {
        background: rgba(255, 255, 255, 0.14);
        color: #f6df9e;
        border: 1px solid rgba(226, 184, 87, 0.55);
        border-radius: 999px;
        padding: 3px 10px;
        font-size: 0.74rem;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 5px;
        white-space: nowrap;
        transition: background-color 0.2s ease, transform 0.2s ease, color 0.2s ease;
      }

      html[data-tema="natal"] .pm-musica-natal-btn:hover {
        background: rgba(226, 184, 87, 0.28);
        color: #ffffff;
        transform: scale(1.03);
      }

      html[data-tema="natal"] .pm-musica-natal-btn.is-muted {
        opacity: 0.75;
        color: #cbd5e1;
        border-color: rgba(203, 213, 225, 0.35);
      }

      html[data-tema="natal"] .pm-proxima-musica-btn {
        background: rgba(255, 255, 255, 0.12);
        color: #f6df9e;
        border: 1px solid rgba(226, 184, 87, 0.45);
        border-radius: 999px;
        padding: 3px 8px;
        font-size: 0.72rem;
        font-weight: 600;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        white-space: nowrap;
        transition: background-color 0.2s ease, transform 0.2s ease;
      }

      html[data-tema="natal"] .pm-proxima-musica-btn:hover {
        background: rgba(226, 184, 87, 0.28);
        color: #ffffff;
        transform: scale(1.04);
      }

      /* Efeito festivo no apontador do rato mais visível (apenas em ponteiro fino e tema Natal) */
      html[data-tema="natal"] #pm-rasto-rato-natal {
        position: fixed;
        inset: 0;
        pointer-events: none;
        user-select: none;
        z-index: 970;
        overflow: hidden;
      }

      .pm-particula-rato {
        position: fixed;
        left: 0;
        top: 0;
        pointer-events: none;
        transform: translate3d(-100px, -100px, 0);
        filter: drop-shadow(0 0 6px rgba(250, 204, 21, 0.95)) drop-shadow(0 1px 2px rgba(15, 23, 42, 0.65));
        will-change: transform, opacity;
        animation: pmParticulaRatoFade 0.8s ease-out forwards;
      }

      @keyframes pmParticulaRatoFade {
        0% {
          opacity: 1;
          scale: 1.15;
        }
        100% {
          opacity: 0;
          scale: 0.45;
          translate: 0 -18px;
        }
      }

      @media (pointer: coarse) {
        html[data-tema="natal"] #pm-rasto-rato-natal {
          display: none !important;
        }
      }

      /* Sobreposição PNG no topo do cabeçalho / imagem, sem bloquear cliques */
      html[data-tema="natal"] #pm-sobreposicao-natal-cabecalho {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        z-index: 4;
        pointer-events: none;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        overflow: hidden;
      }

      html[data-tema="natal"] #pm-sobreposicao-natal-cabecalho img {
        width: 100%;
        max-width: 100%;
        height: auto;
        max-height: 150px;
        object-fit: cover;
        object-position: top center;
        display: block;
      }

      /* Cenas de Natal: Estrelas cadentes com rasto e Pai Natal visíveis também em smartphone */
      html[data-tema="natal"] #pm-cenas-natal {
        position: fixed !important;
        inset: 0 !important;
        pointer-events: none !important;
        user-select: none;
        z-index: 880 !important;
        overflow: hidden !important;
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      html[data-tema="natal"] .pm-estrela-cadente {
        position: fixed !important;
        top: var(--pm-cadente-top, 56px);
        right: -140px;
        width: 130px;
        height: 3px;
        border-radius: 999px;
        background: linear-gradient(90deg, rgba(251, 191, 36, 0.98) 0%, rgba(254, 240, 138, 0.55) 45%, rgba(251, 191, 36, 0) 100%);
        box-shadow: 0 0 12px rgba(251, 191, 36, 0.85);
        transform: rotate(-18deg);
        opacity: 0;
        display: block !important;
        visibility: visible !important;
        animation: pmEstrelaCadente var(--pm-cadente-dur, 6.5s) linear var(--pm-cadente-delay, 0s) infinite;
      }

      html[data-tema="natal"] .pm-estrela-cadente::before {
        content: "";
        position: absolute;
        left: -2px;
        top: -3px;
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: #fffbeb;
        box-shadow: 0 0 14px #fbbf24, 0 0 24px #f59e0b;
      }

      @keyframes pmEstrelaCadente {
        0% {
          opacity: 0;
          transform: translate3d(0, 0, 0) rotate(-18deg);
        }
        6% {
          opacity: 1;
        }
        28% {
          opacity: 0;
          transform: translate3d(-115vw, 34vh, 0) rotate(-18deg);
        }
        100% {
          opacity: 0;
          transform: translate3d(-115vw, 34vh, 0) rotate(-18deg);
        }
      }

      html[data-tema="natal"] .pm-natal-pai {
        position: fixed !important;
        bottom: 14px;
        left: 266px;
        width: 72px;
        height: 82px;
        opacity: 0.95 !important;
        visibility: visible !important;
        display: block !important;
        filter: drop-shadow(0 6px 14px rgba(15, 23, 42, 0.25));
        animation: pmBalancoSuave 4s ease-in-out infinite alternate;
      }

      @keyframes pmBalancoSuave {
        0% {
          transform: translateY(0) rotate(-1.5deg);
        }
        100% {
          transform: translateY(-3px) rotate(1.5deg);
        }
      }

      @media (max-width: 1024px) {
        html[data-tema="natal"] .pm-natal-pai {
          left: 12px !important;
          bottom: 12px !important;
          width: 56px !important;
          height: 64px !important;
        }
      }

      /* Faixa superior de Natal elegante com detalhe dourado suave */
      html[data-tema="natal"] .pm-faixa-natal {
        position: relative;
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
        align-items: center;
        background: linear-gradient(90deg, #0f2749 0%, #163a6d 50%, #0f2749 100%);
        color: #f8fafc;
        border-bottom: 2px solid rgba(226, 184, 87, 0.78);
        box-shadow: 0 4px 16px rgba(15, 39, 73, 0.16);
        overflow: visible;
        font-size: 0.86rem;
        letter-spacing: 0.02em;
        padding: 0.52rem 2.75rem 0.52rem 0.9rem;
      }

      html[data-tema="natal"] .pm-faixa-natal-clip {
        overflow: hidden;
        flex: 1;
        min-width: 0;
      }

      html[data-tema="natal"] .pm-faixa-natal:hover .pm-faixa-natal-pista {
        animation-play-state: paused;
      }

      html[data-tema="natal"] .pm-faixa-natal-pista {
        display: flex;
        white-space: nowrap;
        will-change: transform;
        animation: pmTickerDeslize var(--pm-ticker-dur, 28s) linear infinite;
      }

      html[data-tema="natal"] .pm-faixa-natal-texto {
        padding-right: 52px;
      }

      @keyframes pmTickerDeslize {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-50%); }
      }

      html[data-tema="natal"] .pm-faixa-natal-fechar {
        position: absolute;
        right: 0.65rem;
        top: 50%;
        transform: translateY(-50%);
        z-index: 5;
        background: rgba(255, 255, 255, 0.14);
        color: #ffffff;
        border: 1px solid rgba(226, 184, 87, 0.45);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        cursor: pointer;
        font-size: 1rem;
        line-height: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.2s ease, transform 0.2s ease;
      }

      html[data-tema="natal"] .pm-faixa-natal-fechar:hover {
        background: rgba(226, 184, 87, 0.28);
        transform: translateY(-50%) scale(1.06);
      }

      @media (max-width: 640px) {
        html[data-tema="natal"] .pm-faixa-natal {
          flex-wrap: wrap;
          gap: 6px;
          font-size: 0.78rem;
          padding: 0.48rem 2.4rem 0.48rem 0.7rem;
        }

        html[data-tema="natal"] .pm-controles-musica-faixa {
          margin-right: 0;
        }
      }

      /* Detalhes dourados discretos no menu e rodapé quando em modo Natal */
      html[data-tema="natal"] #menu-lateral ul li a.active {
        background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
        border-color: rgba(246, 223, 158, 0.55);
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.22), 0 0 12px rgba(226, 184, 87, 0.25);
      }

      html[data-tema="natal"] .footer-container {
        border-color: rgba(226, 184, 87, 0.42);
        box-shadow: 0 18px 40px rgba(15, 39, 73, 0.22), 0 0 24px rgba(226, 184, 87, 0.1);
      }

      html[data-tema="natal"] .f-tag {
        border-color: rgba(226, 184, 87, 0.45);
        color: #f6df9e;
      }

      /* Neve bem visível em desktop e smartphone */
      html[data-tema="natal"] #pm-efeito-natal {
        position: fixed !important;
        inset: 0 !important;
        pointer-events: none !important;
        z-index: 900 !important;
        overflow: hidden !important;
        display: block !important;
        opacity: 1 !important;
        visibility: visible !important;
      }

      html[data-tema="natal"] .pm-floco-suave {
        position: absolute;
        top: -16px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(241,245,249,0.85) 65%, rgba(255,255,255,0.2) 100%);
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.75), 0 1px 3px rgba(15, 39, 73, 0.35);
        display: block !important;
        visibility: visible !important;
        will-change: transform;
        animation: pmQuedaSuave var(--pm-floco-dur, 8s) linear var(--pm-floco-delay, 0s) infinite;
      }

      @keyframes pmQuedaSuave {
        0% {
          transform: translate3d(0, -16px, 0);
        }
        25% {
          transform: translate3d(var(--pm-floco-drift, 16px), 26vh, 0);
        }
        50% {
          transform: translate3d(calc(var(--pm-floco-drift, 16px) * -0.6), 52vh, 0);
        }
        75% {
          transform: translate3d(calc(var(--pm-floco-drift, 16px) * 0.9), 78vh, 0);
        }
        100% {
          transform: translate3d(0, 106vh, 0);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .pm-faixa-natal-pista,
        .pm-floco-suave,
        .pm-estrela-cadente,
        .pm-natal-pai,
        #pm-faixa-diagonal-natal,
        #pm-faixa-diagonal-natal::before,
        .pm-penduricalho-item,
        .pm-particula-rato {
          animation: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const MENU_ITENS_HTML = `
    <ul>
      <li>
        <a href="index.html" data-nav-match="index.html,index_2.html">
          <i class="fas fa-home main-icon" aria-hidden="true"></i> Início
        </a>
      </li>

      <li>
        <a href="sobre.html" data-nav-match="sobre.html,sobre_2.html">
          <i class="fas fa-user main-icon" aria-hidden="true"></i> Sobre Mim
        </a>
      </li>

      <li>
        <a href="passeios.html" data-nav-match="passeios.html,passeios_2.html">
          <i class="fas fa-bus main-icon" aria-hidden="true"></i> Passeios
        </a>
      </li>

      <li>
        <a href="galeria.html" data-nav-match="galeria.html,galeria-v13.html,galeria-v14.html,galeria-v15.html,galeria-v16.html">
          <i class="fas fa-images main-icon" aria-hidden="true"></i> Galeria de Fotos
        </a>
      </li>

      <li>
        <a href="contatos.html" data-nav-match="contatos.html">
          <i class="fas fa-envelope main-icon" aria-hidden="true"></i> Contactos
        </a>
      </li>

      <hr>

      <li>
        <a href="dicas.html" data-nav-match="dicas.html,dicas_2.html">
          <i class="fas fa-lightbulb main-icon" aria-hidden="true"></i> Dicas Úteis
        </a>
      </li>

      <li>
        <a href="faq.html" data-nav-match="faq.html,faq_2.html">
          <i class="fas fa-question-circle main-icon" aria-hidden="true"></i> FAQ
        </a>
      </li>
    </ul>

    <div class="redes-sociais-menu">
      <p>Siga-nos</p>

      <div class="icones-redes">
        <a href="https://www.facebook.com/passeiosdomiguel" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.instagram.com/passeiosdomiguel/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <i class="fab fa-instagram"></i>
        </a>
        <a href="https://chat.whatsapp.com/GOsICa89IntAlMqS9ydUzJ" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          <i class="fab fa-whatsapp"></i>
        </a>
      </div>

      <div class="pm-rnaat-rodape-menu">RNAAT 688/2026</div>
    </div>
  `;

  function construirMenuHTML() {
    return `
      <nav id="menu-lateral" aria-label="Navegação principal">
        <a href="index.html" class="logo-container" aria-label="Passeios do Miguel - Início">
          <img src="https://i.imgur.com/X1xT7Fx.png" class="logo" alt="Passeios do Miguel">

          <div class="laco-natal pm-natal-only" aria-hidden="true">
            <svg viewBox="0 0 160 84" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="fitaOuro" x1="15" y1="10" x2="145" y2="65" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#f5dc95"/>
                  <stop offset="50%" stop-color="#d4af5a"/>
                  <stop offset="100%" stop-color="#9e7426"/>
                </linearGradient>
                <linearGradient id="centroRubi" x1="65" y1="20" x2="95" y2="54" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#dc2626"/>
                  <stop offset="100%" stop-color="#8f111b"/>
                </linearGradient>
              </defs>
              <path d="M68 42 L44 74 L58 70 L66 80 L77 46 Z" fill="url(#fitaOuro)"/>
              <path d="M92 42 L116 74 L102 70 L94 80 L83 46 Z" fill="url(#fitaOuro)"/>
              <path d="M74 36 C54 10, 14 12, 16 36 C18 56, 54 52, 74 40 Z" fill="url(#fitaOuro)" stroke="#fff1c2" stroke-width="1.5"/>
              <path d="M86 36 C106 10, 146 12, 144 36 C142 56, 106 52, 86 40 Z" fill="url(#fitaOuro)" stroke="#fff1c2" stroke-width="1.5"/>
              <rect x="68" y="27" width="24" height="22" rx="7" fill="url(#centroRubi)" stroke="#f5dc95" stroke-width="2"/>
              <path d="M80 30 L82.4 35.2 L88 35.8 L83.8 39.5 L85 45 L80 42.2 L75 45 L76.2 39.5 L72 35.8 L77.6 35.2 Z" fill="#fff3c4"/>
            </svg>
          </div>
        </a>

        ${MENU_ITENS_HTML}
      </nav>
    `;
  }

  const RODAPE_HTML = `
    <div class="footer-wrapper">
      <footer class="footer-container" aria-label="Rodapé do site">
        <div class="footer-grid">
          <div class="f-brand">
            <h2>Passeios do Miguel</h2>
            <p>Excursões e roteiros em grupo com proximidade, confiança e espírito de convívio.</p>
            <div class="f-tag"><i class="fas fa-certificate" aria-hidden="true"></i> RNAAT 688/2026</div>
          </div>

          <nav class="f-links" aria-label="Ligações rápidas do rodapé">
            <a href="index.html">Início</a>
            <a href="passeios.html">Passeios</a>
            <a href="sobre.html">Sobre Mim</a>
            <a href="galeria.html" data-nav-match="galeria.html,galeria-v13.html,galeria-v14.html,galeria-v15.html,galeria-v16.html">Galeria de Fotos</a>
            <a href="testemunhos.html">Mural</a>
            <a href="contatos.html">Contactos</a>
          </nav>

          <div class="f-actions">
            <a href="tel:+351965715465" class="f-btn">
              <i class="fas fa-phone-alt" aria-hidden="true"></i>
              <div>
                <span>Ligar diretamente</span>
                <strong>965 715 465</strong>
                <small>Rede móvel nacional</small>
              </div>
            </a>

            <a href="https://wa.me/351965715465" class="f-btn" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-whatsapp" aria-hidden="true"></i>
              <div>
                <span>WhatsApp</span>
                <strong>Falar connosco</strong>
              </div>
            </a>
          </div>
        </div>

        <div class="f-bottom">
          <div>&copy; 2026 Passeios do Miguel &bull; RNAAT 688/2026</div>

          <div class="f-legal">
            <a href="cancelamento.html">Política de Cancelamento</a>
            <a href="faq.html">Perguntas Frequentes</a>

            <a href="https://www.livroreclamacoes.pt/Inicio/"
               target="_blank"
               rel="noopener noreferrer"
               class="livro-reclamacoes"
               aria-label="Livro de Reclamações Eletrónico">
              <img src="https://i.imgur.com/T0HnFBi.png"
                   alt="Livro de Reclamações">
            </a>
          </div>
        </div>
      </footer>
    </div>
  `;

  function clonarPadrao() {
    return {
      tema: CONFIG_PADRAO.tema,
      natal: {
        ...CONFIG_PADRAO.natal,
        musicasUrl: [...PLAYLIST_NATAL_PADRAO]
      },
      avisoGlobal: { ...CONFIG_PADRAO.avisoGlobal },
      integracao: { ...CONFIG_PADRAO.integracao }
    };
  }

  function lerConfigLocal() {
    try {
      const guardado = localStorage.getItem(STORAGE_KEY);
      if (!guardado) return clonarPadrao();
      const parsed = JSON.parse(guardado);
      const padrao = clonarPadrao();
      const listaGuardada = Array.isArray(parsed?.natal?.musicasUrl)
        ? parsed.natal.musicasUrl.filter((u) => typeof u === "string" && u.trim())
        : [];
      return {
        ...padrao,
        ...(parsed && typeof parsed === "object" ? parsed : {}),
        natal: {
          ...padrao.natal,
          ...(parsed?.natal && typeof parsed.natal === "object" ? parsed.natal : {}),
          musicasUrl: listaGuardada.length > 0 ? listaGuardada : [...PLAYLIST_NATAL_PADRAO]
        },
        avisoGlobal: {
          ...padrao.avisoGlobal,
          ...(parsed?.avisoGlobal && typeof parsed.avisoGlobal === "object" ? parsed.avisoGlobal : {})
        },
        integracao: {
          ...padrao.integracao,
          ...(parsed?.integracao && typeof parsed.integracao === "object" ? parsed.integracao : {})
        }
      };
    } catch {
      return clonarPadrao();
    }
  }

  function guardarConfigLocal(cfg) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cfg));
    } catch (e) {
      console.warn("Não foi possível guardar a configuração no localStorage:", e);
    }
  }

  function aplicarTemaDaQueryString(cfg) {
    try {
      const params = new URLSearchParams(window.location.search);
      const temaParam = params.get("tema");
      if (temaParam === "natal" || temaParam === "normal") {
        cfg.tema = temaParam;
        guardarConfigLocal(cfg);
      }
    } catch {
      // Ignora ambientes sem URLSearchParams válido
    }
    return cfg;
  }

  function marcarLinkAtivoNoMenu(container) {
    const caminhoAtual = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    const links = container.querySelectorAll("a[data-nav-match]");

    links.forEach((link) => {
      link.classList.remove("active");
      link.removeAttribute("aria-current");

      const alvos = (link.getAttribute("data-nav-match") || "")
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

      if (alvos.includes(caminhoAtual)) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function renderizarMenu(tipoPagina) {
    if (tipoPagina === "viagem") return;
    const placeholder = document.getElementById("menu-placeholder");
    if (!placeholder) return;
    placeholder.innerHTML = construirMenuHTML();
    marcarLinkAtivoNoMenu(placeholder);
  }

  function renderizarRodapeSeNecessario(tipoPagina) {
    if (tipoPagina === "viagem") return;
    const placeholder =
      document.getElementById("footer-placeholder") ||
      document.getElementById("rodape-placeholder");
    if (!placeholder) return;
    if (!placeholder.querySelector(".footer-wrapper")) {
      placeholder.innerHTML = RODAPE_HTML;
    }
  }

  function obterDelayContinuoFaixaNatal() {
    try {
      let inicio = Number(sessionStorage.getItem(XMAS_TICKER_START_KEY));
      if (!Number.isFinite(inicio) || inicio <= 0) {
        inicio = Date.now();
        sessionStorage.setItem(XMAS_TICKER_START_KEY, String(inicio));
      }
      const decorridoSeg = (Date.now() - inicio) / 1000;
      const offsetSeg =
        ((decorridoSeg % XMAS_TICKER_DURATION_SEC) + XMAS_TICKER_DURATION_SEC) %
        XMAS_TICKER_DURATION_SEC;
      return `-${offsetSeg.toFixed(3)}s`;
    } catch {
      return "0s";
    }
  }

  function urlSegura(src) {
    if (!src || typeof src !== "string") return "";
    const limpo = src.trim();
    if (/^(javascript|data|vbscript):/i.test(limpo)) return "";
    return limpo;
  }

  function obterPlaylistSegura(natalCfg) {
    const lista = [];
    if (Array.isArray(natalCfg?.musicasUrl)) {
      natalCfg.musicasUrl.forEach((item) => {
        const segura = urlSegura(item);
        if (segura && !lista.includes(segura)) lista.push(segura);
      });
    }
    const unica = urlSegura(natalCfg?.musicaUrl);
    if (unica && !lista.includes(unica)) {
      lista.unshift(unica);
    }
    return lista.length > 0 ? lista : [...PLAYLIST_NATAL_PADRAO];
  }

  let audioNatal = {
    el: null,
    playlist: [],
    indiceAtual: 0,
    urlAtual: "",
    silenciado: false,
    retryHookRegistado: false,
    syncTimer: null
  };

  function lerPreferenciaSilencio() {
    try {
      return sessionStorage.getItem(XMAS_MUSIC_MUTED_KEY) === "1";
    } catch {
      return false;
    }
  }

  function guardarPreferenciaSilencio(muted) {
    try {
      sessionStorage.setItem(XMAS_MUSIC_MUTED_KEY, muted ? "1" : "0");
    } catch {
      // Ignora restrições de sessionStorage
    }
  }

  function lerIndiceGuardado(total) {
    if (total <= 0) return 0;
    try {
      const idx = Number(sessionStorage.getItem(XMAS_MUSIC_INDEX_KEY));
      if (Number.isInteger(idx) && idx >= 0 && idx < total) return idx;
    } catch {
      // Ignora restrições de sessionStorage
    }
    return 0;
  }

  function guardarIndiceAtual(idx) {
    try {
      sessionStorage.setItem(XMAS_MUSIC_INDEX_KEY, String(idx));
    } catch {
      // Ignora restrições de sessionStorage
    }
  }

  function lerTempoGuardado() {
    try {
      const guardado = Number(sessionStorage.getItem(XMAS_MUSIC_TIME_KEY));
      return Number.isFinite(guardado) && guardado > 0 ? guardado : 0;
    } catch {
      return 0;
    }
  }

  function guardarTempoMusica() {
    if (!audioNatal.el) return;
    try {
      if (Number.isFinite(audioNatal.el.currentTime) && audioNatal.el.currentTime > 0) {
        sessionStorage.setItem(XMAS_MUSIC_TIME_KEY, String(audioNatal.el.currentTime));
      }
      guardarIndiceAtual(audioNatal.indiceAtual);
    } catch {
      // Ignora restrições de sessionStorage
    }
  }

  function atualizarBotaoMusicaUI() {
    const btn = document.getElementById("pm-musica-natal-btn");
    const btnProx = document.getElementById("pm-proxima-musica-btn");

    if (btn) {
      const isMuted = audioNatal.silenciado;
      btn.classList.toggle("is-muted", isMuted);
      btn.setAttribute("aria-pressed", String(!isMuted));
      btn.setAttribute(
        "aria-label",
        isMuted ? "Ativar música de Natal" : "Silenciar música de Natal"
      );
      btn.innerHTML = isMuted
        ? '<i class="fas fa-volume-mute" aria-hidden="true"></i><span>Silenciado</span>'
        : '<i class="fas fa-music" aria-hidden="true"></i><span>Som</span>';
    }

    if (btnProx) {
      btnProx.style.display = audioNatal.playlist.length > 1 ? "inline-flex" : "none";
    }
  }

  function fazerFadeInVolume(el, alvo = 0.22, duracaoMs = 400) {
    if (!el) return;
    el.volume = 0.01;
    const passos = 8;
    const intervalo = Math.max(20, Math.floor(duracaoMs / passos));
    let atual = 0;

    if (el._pmFadeTimer) {
      window.clearInterval(el._pmFadeTimer);
    }

    el._pmFadeTimer = window.setInterval(() => {
      atual += 1;
      const progresso = Math.min(1, atual / passos);
      el.volume = Number((0.01 + (alvo - 0.01) * progresso).toFixed(3));
      if (progresso >= 1) {
        window.clearInterval(el._pmFadeTimer);
        el._pmFadeTimer = null;
      }
    }, intervalo);
  }

  function aplicarTempoSalvoSeNecessario(el, tempoAlvo) {
    if (!el || !(tempoAlvo > 0)) return;
    try {
      const destinoTempo =
        Number.isFinite(el.duration) && el.duration > 0
          ? Math.min(tempoAlvo, Math.max(0, el.duration - 0.5))
          : tempoAlvo;
      if (el.currentTime < 1 || Math.abs(el.currentTime - destinoTempo) > 1.2) {
        el.currentTime = destinoTempo;
      }
    } catch {
      // Ignora se ainda não for possível aplicar seek
    }
  }

  function tentarTocarMusicaNatal() {
    if (audioNatal.silenciado) {
      if (audioNatal.el?._pmFadeTimer) {
        window.clearInterval(audioNatal.el._pmFadeTimer);
        audioNatal.el._pmFadeTimer = null;
      }
      audioNatal.el?.pause();
      return;
    }

    if (audioNatal.el && audioNatal.urlAtual) {
      const promessa = audioNatal.el.play();
      if (promessa && typeof promessa.then === "function") {
        promessa
          .then(() => {
            fazerFadeInVolume(audioNatal.el, 0.22, 400);
          })
          .catch(() => {
            // Autoplay bloqueado até interação do utilizador
          });
      } else {
        fazerFadeInVolume(audioNatal.el, 0.22, 400);
      }
    }
  }

  function carregarFaixaPorIndice(novoIndice, restaurarTempo = false) {
    const total = audioNatal.playlist.length;
    if (!audioNatal.el || total === 0) return;

    const idxValido = ((novoIndice % total) + total) % total;
    const url = audioNatal.playlist[idxValido];

    audioNatal.indiceAtual = idxValido;
    audioNatal.urlAtual = url;
    audioNatal.el.dataset.tentouErro = "0";
    guardarIndiceAtual(idxValido);

    let tempoAlvo = 0;
    if (restaurarTempo) {
      tempoAlvo = lerTempoGuardado();
    } else {
      try {
        sessionStorage.removeItem(XMAS_MUSIC_TIME_KEY);
      } catch {
        // Ignora restrições de sessionStorage
      }
    }

    if (audioNatal.el._pmTempoListener) {
      audioNatal.el.removeEventListener("loadedmetadata", audioNatal.el._pmTempoListener);
      audioNatal.el.removeEventListener("canplay", audioNatal.el._pmTempoListener);
      audioNatal.el.removeEventListener("playing", audioNatal.el._pmTempoListener);
      audioNatal.el._pmTempoListener = null;
    }

    if (audioNatal.el.getAttribute("src") !== url) {
      audioNatal.el.src = url;
      audioNatal.el.load();
    }

    atualizarBotaoMusicaUI();

    if (tempoAlvo > 0) {
      audioNatal.el._pmTempoListener = () => {
        if (!audioNatal.el) return;
        aplicarTempoSalvoSeNecessario(audioNatal.el, tempoAlvo);
      };
      audioNatal.el.addEventListener("loadedmetadata", audioNatal.el._pmTempoListener, { once: true });
      audioNatal.el.addEventListener("canplay", audioNatal.el._pmTempoListener, { once: true });
      audioNatal.el.addEventListener("playing", audioNatal.el._pmTempoListener, { once: true });
      if (audioNatal.el.readyState >= 1) {
        aplicarTempoSalvoSeNecessario(audioNatal.el, tempoAlvo);
      }
    }

    tentarTocarMusicaNatal();
  }

  function avancarProximaFaixaNatal() {
    if (audioNatal.playlist.length <= 1) return;
    carregarFaixaPorIndice(audioNatal.indiceAtual + 1, false);
  }

  function gerirMusicaNatal(ativar, natalCfg, tipoPagina) {
    const ocultar = tipoPagina === "viagem" && document.body?.dataset?.ocultarAviso === "true";
    const playlist = obterPlaylistSegura(natalCfg);
    audioNatal.playlist = playlist;

    if (!ativar || ocultar || playlist.length === 0) {
      if (audioNatal.el) {
        guardarTempoMusica();
        audioNatal.el.pause();
      }
      atualizarBotaoMusicaUI();
      return;
    }

    audioNatal.silenciado = lerPreferenciaSilencio();

    if (!audioNatal.el) {
      const el = document.createElement("audio");
      el.id = "pm-audio-natal";
      el.preload = "auto";
      el.volume = 0.01;
      el.style.display = "none";
      el.addEventListener("timeupdate", () => {
        if (!el.paused && Number.isFinite(el.currentTime) && el.currentTime > 0) {
          try {
            sessionStorage.setItem(XMAS_MUSIC_TIME_KEY, String(el.currentTime));
            guardarIndiceAtual(audioNatal.indiceAtual);
          } catch {
            // Ignora restrições de sessionStorage
          }
        }
      });
      el.addEventListener("pause", guardarTempoMusica);
      el.addEventListener("ended", () => {
        if (audioNatal.playlist.length > 1) {
          carregarFaixaPorIndice(audioNatal.indiceAtual + 1, false);
        } else {
          el.currentTime = 0;
          tentarTocarMusicaNatal();
        }
      });
      el.addEventListener("error", () => {
        console.warn("Não foi possível carregar a faixa de áudio:", audioNatal.urlAtual);
        if (audioNatal.playlist.length > 1 && el.dataset.tentouErro !== "1") {
          el.dataset.tentouErro = "1";
          carregarFaixaPorIndice(audioNatal.indiceAtual + 1, false);
        }
      });
      document.body.appendChild(el);
      audioNatal.el = el;

      if (!audioNatal.syncTimer) {
        audioNatal.syncTimer = window.setInterval(() => {
          if (audioNatal.el && !audioNatal.el.paused && audioNatal.el.currentTime > 0) {
            guardarTempoMusica();
          }
        }, 400);
      }

      window.addEventListener("pagehide", guardarTempoMusica);
      window.addEventListener("beforeunload", guardarTempoMusica);
      document.addEventListener(
        "click",
        (ev) => {
          const link = ev.target instanceof Element ? ev.target.closest("a[href]") : null;
          if (!link) return;
          const href = (link.getAttribute("href") || "").trim();
          if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("javascript:") ||
            href.startsWith("tel:") ||
            href.startsWith("mailto:")
          ) {
            return;
          }
          guardarTempoMusica();
        },
        { capture: true, passive: true }
      );
    }

    audioNatal.el.loop = playlist.length === 1;

    const idxInicial = lerIndiceGuardado(playlist.length);
    carregarFaixaPorIndice(idxInicial, true);

    if (!audioNatal.retryHookRegistado) {
      const aoInteragir = () => {
        if (!audioNatal.silenciado && audioNatal.urlAtual && audioNatal.el?.paused) {
          tentarTocarMusicaNatal();
        }
      };
      document.addEventListener("pointerdown", aoInteragir, { passive: true });
      document.addEventListener("keydown", aoInteragir, { passive: true });
      audioNatal.retryHookRegistado = true;
    }
  }

  function gerirFaixaDiagonalNatal(ativar, natalCfg, tipoPagina) {
    const existente = document.getElementById("pm-faixa-diagonal-natal");
    const ocultar = tipoPagina === "viagem" && document.body?.dataset?.ocultarAviso === "true";

    if (!ativar || ocultar) {
      if (existente) existente.remove();
      return;
    }

    const texto =
      typeof natalCfg?.textoDiagonal === "string" && natalCfg.textoDiagonal.trim()
        ? natalCfg.textoDiagonal.trim()
        : TEXTO_FAIXA_DIAGONAL_NATAL;

    const destino = document.querySelector("main") || document.body;
    if (destino && window.getComputedStyle(destino).position === "static") {
      destino.style.position = "relative";
    }

    let faixa = existente;
    if (!faixa) {
      faixa = document.createElement("div");
      faixa.id = "pm-faixa-diagonal-natal";
      faixa.setAttribute("aria-hidden", "true");

      const span = document.createElement("span");
      span.className = "pm-faixa-diagonal-texto";
      faixa.appendChild(span);

      destino.prepend(faixa);
    } else if (faixa.parentElement !== destino) {
      destino.prepend(faixa);
    }

    const spanEl = faixa.querySelector(".pm-faixa-diagonal-texto");
    if (spanEl && spanEl.textContent !== texto) {
      spanEl.textContent = texto;
    }
  }

  let estadoRatoNatal = {
    ativo: false,
    ultimoTempo: 0,
    listenerRegistado: false,
    handler: null
  };

  function gerirRastoRatoNatal(ativar, tipoPagina) {
    const ocultar = tipoPagina === "viagem" && document.body?.dataset?.ocultarAviso === "true";
    const deveAtivar = Boolean(ativar && !ocultar);
    estadoRatoNatal.ativo = deveAtivar;

    let camada = document.getElementById("pm-rasto-rato-natal");
    if (!deveAtivar) {
      if (camada) camada.remove();
      return;
    }

    if (!camada) {
      camada = document.createElement("div");
      camada.id = "pm-rasto-rato-natal";
      camada.setAttribute("aria-hidden", "true");
      document.body.appendChild(camada);
    }

    if (!estadoRatoNatal.listenerRegistado) {
      estadoRatoNatal.handler = (ev) => {
        if (!estadoRatoNatal.ativo) return;
        const agora = performance.now();
        if (agora - estadoRatoNatal.ultimoTempo < 36) return;
        estadoRatoNatal.ultimoTempo = agora;

        const host = document.getElementById("pm-rasto-rato-natal");
        if (!host) return;

        const part = document.createElement("span");
        part.className = "pm-particula-rato";
        const offsetX = (Math.random() - 0.5) * 18;
        const offsetY = (Math.random() - 0.5) * 18;
        part.style.transform = `translate3d(${Math.round(ev.clientX + offsetX)}px, ${Math.round(ev.clientY + offsetY)}px, 0)`;

        const tipo = Math.floor(Math.random() * 3);
        if (tipo === 0) {
          part.innerHTML = `<svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M8 1L9.9 5.6L15 6.1L11.1 9.4L12.3 14.5L8 11.8L3.7 14.5L4.9 9.4L1 6.1L6.1 5.6L8 1Z" fill="#fde047" stroke="#d97706" stroke-width="0.9"/></svg>`;
        } else if (tipo === 1) {
          part.innerHTML = `<svg width="14" height="14" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" fill="#facc15" stroke="#b45309" stroke-width="0.9"/></svg>`;
        } else {
          part.innerHTML = `<svg width="13" height="13" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="4.8" fill="#ffffff" stroke="#fde047" stroke-width="1.2"/></svg>`;
        }

        host.appendChild(part);
        window.setTimeout(() => {
          part.remove();
        }, 820);
      };

      document.addEventListener("mousemove", estadoRatoNatal.handler, { passive: true });
      estadoRatoNatal.listenerRegistado = true;
    }
  }

  function gerirSobreposicaoCabecalhoNatal(ativar, natalCfg, tipoPagina) {
    const existente = document.getElementById("pm-sobreposicao-natal-cabecalho");
    const ocultar = tipoPagina === "viagem" && document.body?.dataset?.ocultarAviso === "true";
    const srcSegura = urlSegura(natalCfg?.imagemCabecalhoUrl);

    if (!ativar || ocultar || !srcSegura) {
      if (existente) existente.remove();
      return;
    }

    const alvoHero = document.querySelector(".hero-section") || document.querySelector("header");
    if (!alvoHero) {
      if (existente) existente.remove();
      return;
    }

    const estiloComputado = window.getComputedStyle(alvoHero);
    if (estiloComputado.position === "static") {
      alvoHero.style.position = "relative";
    }

    let wrapper = existente;
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.id = "pm-sobreposicao-natal-cabecalho";
      wrapper.setAttribute("aria-hidden", "true");
      alvoHero.appendChild(wrapper);
    }

    let img = wrapper.querySelector("img");
    if (!img) {
      img = document.createElement("img");
      img.alt = "";
      img.decoding = "async";
      wrapper.appendChild(img);
    }

    if (img.getAttribute("src") !== srcSegura) {
      img.setAttribute("src", srcSegura);
    }
  }

  function gerirCenasNatal(ativar, tipoPagina) {
    const existente = document.getElementById("pm-cenas-natal");
    const ocultar = tipoPagina === "viagem" && document.body?.dataset?.ocultarAviso === "true";

    if (!ativar || ocultar) {
      if (existente) existente.remove();
      return;
    }

    if (existente) return;

    const cenas = document.createElement("div");
    cenas.id = "pm-cenas-natal";
    cenas.setAttribute("aria-hidden", "true");

    const cadentes = [
      { top: "54px", dur: "6.5s", delay: "0s" },
      { top: "118px", dur: "7.8s", delay: "-2.8s" },
      { top: "82px", dur: "8.6s", delay: "-5.1s" }
    ];

    cadentes.forEach((item) => {
      const estrela = document.createElement("span");
      estrela.className = "pm-estrela-cadente";
      estrela.style.setProperty("--pm-cadente-top", item.top);
      estrela.style.setProperty("--pm-cadente-dur", item.dur);
      estrela.style.setProperty("--pm-cadente-delay", item.delay);
      cenas.appendChild(estrela);
    });

    cenas.insertAdjacentHTML(
      "beforeend",
      `
      <svg class="pm-natal-pai" viewBox="0 0 92 104" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="46" cy="74" rx="24" ry="22" fill="#dc2626"/>
        <rect x="24" y="68" width="44" height="8" rx="2" fill="#1e293b"/>
        <rect x="41" y="67" width="10" height="10" rx="1.5" fill="#fbbf24"/>
        <circle cx="46" cy="42" r="14" fill="#fde68a"/>
        <path d="M32 43 C32 56, 60 56, 60 43 C58 59, 34 59, 32 43 Z" fill="#ffffff"/>
        <circle cx="41" cy="40" r="1.8" fill="#1e293b"/>
        <circle cx="51" cy="40" r="1.8" fill="#1e293b"/>
        <circle cx="46" cy="44" r="2.2" fill="#f97316"/>
        <path d="M30 34 C34 15, 62 15, 68 31 Z" fill="#dc2626"/>
        <rect x="28" y="31" width="38" height="7" rx="3.5" fill="#ffffff"/>
        <circle cx="69" cy="33" r="5" fill="#ffffff"/>
      </svg>
    `
    );

    document.body.appendChild(cenas);
  }

  function gerirFaixaNatal(ativar, natalCfg, tipoPagina) {
    const existente = document.getElementById("pm-faixa-natal");
    const ocultarEmViagem = tipoPagina === "viagem" && document.body?.dataset?.ocultarAviso === "true";

    let ocultadaSessao = false;
    try {
      ocultadaSessao = sessionStorage.getItem(DISMISS_XMAS_TICKER_KEY) === "1";
    } catch {
      ocultadaSessao = false;
    }

    if (!ativar || ocultarEmViagem || ocultadaSessao) {
      if (existente) existente.remove();
      return;
    }

    if (existente) return;

    const faixa = document.createElement("div");
    faixa.id = "pm-faixa-natal";
    faixa.className = "pm-faixa-natal";
    faixa.setAttribute("role", "region");
    faixa.setAttribute("aria-label", "Mensagem especial de Natal");

    const clip = document.createElement("div");
    clip.className = "pm-faixa-natal-clip";

    const pista = document.createElement("div");
    pista.className = "pm-faixa-natal-pista";
    pista.style.setProperty("--pm-ticker-dur", `${XMAS_TICKER_DURATION_SEC}s`);
    pista.style.animationDelay = obterDelayContinuoFaixaNatal();

    for (let i = 0; i < 2; i++) {
      const span = document.createElement("span");
      span.className = "pm-faixa-natal-texto";
      span.textContent = FRASE_NATAL_SUPERIOR;
      if (i === 1) span.setAttribute("aria-hidden", "true");
      pista.appendChild(span);
    }

    clip.appendChild(pista);

    const penduricalhos = document.createElement("div");
    penduricalhos.className = "pm-penduricalhos-faixa";
    penduricalhos.setAttribute("aria-hidden", "true");

    const totalPenduricalhos = 16;
    for (let i = 0; i < totalPenduricalhos; i++) {
      const item = document.createElement("span");
      item.className = "pm-penduricalho-item";
      item.style.setProperty("--pm-pend-dur", `${2.2 + (i % 4) * 0.4}s`);
      item.style.setProperty("--pm-pend-delay", `${(i % 5) * -0.35}s`);

      const enfeite = document.createElement("span");
      if (i % 3 === 0) {
        enfeite.className = "pm-luz-amarela-faixa";
      } else if (i % 3 === 1) {
        enfeite.className = "pm-bola-faixa";
      } else {
        enfeite.className = "pm-bola-faixa cor-rubi";
      }

      item.appendChild(enfeite);
      penduricalhos.appendChild(item);
    }

    const controlesMusica = document.createElement("div");
    controlesMusica.className = "pm-controles-musica-faixa";

    const btnMusica = document.createElement("button");
    btnMusica.type = "button";
    btnMusica.id = "pm-musica-natal-btn";
    btnMusica.className = "pm-musica-natal-btn";
    btnMusica.addEventListener("click", () => {
      audioNatal.silenciado = !audioNatal.silenciado;
      guardarPreferenciaSilencio(audioNatal.silenciado);
      if (audioNatal.silenciado) {
        guardarTempoMusica();
        audioNatal.el?.pause();
      } else {
        tentarTocarMusicaNatal();
      }
      atualizarBotaoMusicaUI();
    });

    const btnProx = document.createElement("button");
    btnProx.type = "button";
    btnProx.id = "pm-proxima-musica-btn";
    btnProx.className = "pm-proxima-musica-btn";
    btnProx.setAttribute("aria-label", "Próxima música de Natal");
    btnProx.title = "Próxima música";
    btnProx.innerHTML = '<i class="fas fa-step-forward" aria-hidden="true"></i>';
    btnProx.addEventListener("click", () => {
      avancarProximaFaixaNatal();
    });

    controlesMusica.appendChild(btnMusica);
    controlesMusica.appendChild(btnProx);
    faixa.appendChild(controlesMusica);

    const btnFechar = document.createElement("button");
    btnFechar.type = "button";
    btnFechar.className = "pm-faixa-natal-fechar";
    btnFechar.setAttribute("aria-label", "Fechar faixa de Natal");
    btnFechar.textContent = "×";
    btnFechar.addEventListener("click", () => {
      try {
        sessionStorage.setItem(DISMISS_XMAS_TICKER_KEY, "1");
      } catch {
        // Ignora restrições de sessionStorage
      }
      faixa.remove();
    });

    faixa.appendChild(clip);
    faixa.appendChild(penduricalhos);
    faixa.appendChild(btnFechar);

    const destino = document.querySelector("main") || document.body;
    destino.prepend(faixa);
    atualizarBotaoMusicaUI();
  }

  function gerirNeve(ativar, tipoPagina) {
    const existente = document.getElementById("pm-efeito-natal");
    const permitirNeve =
      ativar && (tipoPagina !== "viagem" || document.body?.dataset?.neveViagem === "true");

    if (!permitirNeve) {
      if (existente) existente.remove();
      return;
    }

    if (existente) return;

    const container = document.createElement("div");
    container.id = "pm-efeito-natal";
    container.setAttribute("aria-hidden", "true");

    const flocos = 42;
    for (let i = 0; i < flocos; i++) {
      const floco = document.createElement("span");
      floco.className = "pm-floco-suave";
      const tamanho = 6 + (i % 4) * 2;
      const duracao = 7 + (i % 5) * 1.8;
      const atraso = (i % 9) * -0.9;
      const deriva = (i % 2 === 0 ? 1 : -1) * (12 + (i % 4) * 5);
      floco.style.width = `${tamanho}px`;
      floco.style.height = `${tamanho}px`;
      floco.style.left = `${((i * 2.38) % 98) + 1}%`;
      floco.style.setProperty("--pm-floco-dur", `${duracao}s`);
      floco.style.setProperty("--pm-floco-delay", `${atraso}s`);
      floco.style.setProperty("--pm-floco-drift", `${deriva}px`);
      floco.style.opacity = `${0.55 + (i % 4) * 0.12}`;
      container.appendChild(floco);
    }

    document.body.appendChild(container);
  }

  function urlAvisoSegura(href) {
    if (!href || typeof href !== "string") return "";
    const limpo = href.trim();
    if (/^(javascript|data|vbscript):/i.test(limpo)) return "";
    return limpo;
  }

  function renderizarAvisoGlobal(aviso, tipoPagina) {
    const antigo = document.getElementById("pm-aviso-global");
    if (antigo) antigo.remove();

    if (!aviso || !aviso.ativo || !aviso.texto) return;
    if (tipoPagina === "viagem" && document.body?.dataset?.ocultarAviso === "true") return;

    try {
      if (sessionStorage.getItem(DISMISS_NOTICE_KEY) === "1") return;
    } catch {
      // Ignora restrições de sessionStorage
    }

    const bar = document.createElement("div");
    bar.id = "pm-aviso-global";
    bar.className = "pm-aviso-bar";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Aviso do site");

    const msg = document.createElement("span");
    msg.textContent = aviso.texto;
    bar.appendChild(msg);

    const hrefSeguro = urlAvisoSegura(aviso.linkHref);
    if (aviso.linkTexto && hrefSeguro) {
      const a = document.createElement("a");
      a.href = hrefSeguro;
      a.textContent = aviso.linkTexto;
      bar.appendChild(a);
    }

    const btnFechar = document.createElement("button");
    btnFechar.type = "button";
    btnFechar.className = "pm-aviso-fechar";
    btnFechar.setAttribute("aria-label", "Fechar aviso");
    btnFechar.textContent = "×";
    btnFechar.addEventListener("click", () => {
      try {
        sessionStorage.setItem(DISMISS_NOTICE_KEY, "1");
      } catch {
        // Ignora restrições de sessionStorage
      }
      bar.remove();
    });
    bar.appendChild(btnFechar);

    const destino = document.querySelector("main") || document.body;
    destino.prepend(bar);
  }

  function aplicarTemaNoDOM(cfg) {
    injetarEstilosNatalRefinados();
    const root = document.documentElement;
    const temaValido = cfg.tema === "natal" ? "natal" : "normal";
    root.setAttribute("data-tema", temaValido);

    const tipoPagina = document.body?.dataset?.pagina || "geral";
    root.setAttribute("data-pagina", tipoPagina);

    renderizarMenu(tipoPagina);
    renderizarRodapeSeNecessario(tipoPagina);
    gerirFaixaDiagonalNatal(temaValido === "natal", cfg.natal, tipoPagina);
    gerirRastoRatoNatal(temaValido === "natal", tipoPagina);
    gerirSobreposicaoCabecalhoNatal(temaValido === "natal", cfg.natal, tipoPagina);
    gerirCenasNatal(temaValido === "natal", tipoPagina);
    gerirFaixaNatal(temaValido === "natal", cfg.natal, tipoPagina);
    gerirMusicaNatal(temaValido === "natal", cfg.natal, tipoPagina);
    gerirNeve(temaValido === "natal", tipoPagina);
    renderizarAvisoGlobal(cfg.avisoGlobal, tipoPagina);
  }

  let estadoAtual = aplicarTemaDaQueryString(lerConfigLocal());

  async function carregarConfigRemota() {
    const endpoint = estadoAtual.integracao?.endpointConfig || CONFIG_PADRAO.integracao.endpointConfig;
    const ativo = Boolean(estadoAtual.integracao?.ativo);
    if (!ativo || !endpoint) return estadoAtual;

    try {
      const resp = await fetch(endpoint, {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store"
      });
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const dados = await resp.json();

      estadoAtual = {
        ...estadoAtual,
        ...(dados && typeof dados === "object" ? dados : {}),
        natal: {
          ...estadoAtual.natal,
          ...(dados?.natal && typeof dados.natal === "object" ? dados.natal : {}),
          musicasUrl: Array.isArray(dados?.natal?.musicasUrl)
            ? [...dados.natal.musicasUrl]
            : estadoAtual.natal.musicasUrl
        },
        avisoGlobal: {
          ...estadoAtual.avisoGlobal,
          ...(dados?.avisoGlobal && typeof dados.avisoGlobal === "object" ? dados.avisoGlobal : {})
        },
        integracao: estadoAtual.integracao
      };

      guardarConfigLocal(estadoAtual);
      aplicarTemaNoDOM(estadoAtual);
      return estadoAtual;
    } catch (erro) {
      console.warn("Sem ligação ao servidor de configuração; a manter estado local:", erro);
      return estadoAtual;
    }
  }

  async function guardarConfigRemota(tokenAdmin = "") {
    const endpoint = estadoAtual.integracao?.endpointConfig || CONFIG_PADRAO.integracao.endpointConfig;
    const ativo = Boolean(estadoAtual.integracao?.ativo);
    if (!ativo || !endpoint) {
      return { ok: true, localApenas: true };
    }

    const headers = { "Content-Type": "application/json" };
    if (tokenAdmin) headers.Authorization = `Bearer ${tokenAdmin}`;

    const resp = await fetch(endpoint, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        tema: estadoAtual.tema,
        natal: estadoAtual.natal,
        avisoGlobal: estadoAtual.avisoGlobal
      })
    });

    if (!resp.ok) {
      throw new Error(`Erro ao publicar no servidor: HTTP ${resp.status}`);
    }

    return await resp.json();
  }

  const SiteConfig = {
    get() {
      return {
        ...estadoAtual,
        natal: {
          ...estadoAtual.natal,
          musicasUrl: Array.isArray(estadoAtual.natal.musicasUrl)
            ? [...estadoAtual.natal.musicasUrl]
            : []
        },
        avisoGlobal: { ...estadoAtual.avisoGlobal },
        integracao: { ...estadoAtual.integracao }
      };
    },
    setTema(novoTema) {
      try {
        sessionStorage.removeItem(DISMISS_XMAS_TICKER_KEY);
      } catch {
        // Ignora restrições de sessionStorage
      }
      estadoAtual.tema = novoTema === "natal" ? "natal" : "normal";
      guardarConfigLocal(estadoAtual);
      aplicarTemaNoDOM(estadoAtual);
      return this.get();
    },
    setAviso(avisoParcial) {
      try {
        sessionStorage.removeItem(DISMISS_NOTICE_KEY);
      } catch {
        // Ignora restrições de sessionStorage
      }
      estadoAtual.avisoGlobal = {
        ...estadoAtual.avisoGlobal,
        ...(avisoParcial && typeof avisoParcial === "object" ? avisoParcial : {})
      };
      guardarConfigLocal(estadoAtual);
      aplicarTemaNoDOM(estadoAtual);
      return this.get();
    },
    atualizarTudo(novaConfig) {
      if (!novaConfig || typeof novaConfig !== "object") return this.get();
      estadoAtual = {
        ...estadoAtual,
        ...novaConfig,
        natal: {
          ...estadoAtual.natal,
          ...(novaConfig.natal && typeof novaConfig.natal === "object" ? novaConfig.natal : {}),
          musicasUrl: Array.isArray(novaConfig?.natal?.musicasUrl)
            ? [...novaConfig.natal.musicasUrl]
            : estadoAtual.natal.musicasUrl
        },
        avisoGlobal: {
          ...estadoAtual.avisoGlobal,
          ...(novaConfig.avisoGlobal && typeof novaConfig.avisoGlobal === "object" ? novaConfig.avisoGlobal : {})
        },
        integracao: {
          ...estadoAtual.integracao,
          ...(novaConfig.integracao && typeof novaConfig.integracao === "object" ? novaConfig.integracao : {})
        }
      };
      guardarConfigLocal(estadoAtual);
      aplicarTemaNoDOM(estadoAtual);
      return this.get();
    },
    reset() {
      try {
        sessionStorage.removeItem(DISMISS_NOTICE_KEY);
        sessionStorage.removeItem(DISMISS_XMAS_TICKER_KEY);
        sessionStorage.removeItem(XMAS_TICKER_START_KEY);
        sessionStorage.removeItem(XMAS_MUSIC_MUTED_KEY);
        sessionStorage.removeItem(XMAS_MUSIC_TIME_KEY);
        sessionStorage.removeItem(XMAS_MUSIC_INDEX_KEY);
      } catch {
        // Ignora restrições de sessionStorage
      }
      estadoAtual = clonarPadrao();
      guardarConfigLocal(estadoAtual);
      aplicarTemaNoDOM(estadoAtual);
      return this.get();
    },
    reaplicar() {
      estadoAtual = lerConfigLocal();
      aplicarTemaNoDOM(estadoAtual);
      return this.get();
    },
    async sincronizarServidor() {
      return await carregarConfigRemota();
    },
    async publicarServidor(tokenAdmin = "") {
      return await guardarConfigRemota(tokenAdmin);
    }
  };

  window.SiteConfig = SiteConfig;

  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      estadoAtual = lerConfigLocal();
      aplicarTemaNoDOM(estadoAtual);
    }
  });

  function iniciar() {
    aplicarTemaNoDOM(estadoAtual);
    carregarConfigRemota();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();