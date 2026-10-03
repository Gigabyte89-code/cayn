# Glow viola reattivo sulle card

## Obiettivo
Applicare alle card del portfolio un bordo luminoso che segue il puntatore, coerente con il tema nero e viola, senza alterare i contenuti o la struttura delle pagine.

## Intervento
- Integrare un componente `BorderGlow` riutilizzabile e tipizzato, adattato al design system esistente.
- Usare una palette viola/lilla derivata dall’accento del sito, con intensità discreta e sfondo trasparente per conservare il liquid glass.
- Applicarlo alle card principali e secondarie di Home, About, Projects, FAQ, ICDL e footer, evitando controlli, pillole, icone e cornici immagini che non sono vere card.
- Disattivare il movimento su dispositivi touch e quando è attiva la preferenza di riduzione delle animazioni.
- Verificare compilazione e resa su desktop e mobile.

## Dettagli tecnici
Il glow reagirà solo vicino ai bordi tramite variabili CSS aggiornate dal puntatore. Il componente manterrà il tag HTML corretto tramite una proprietà configurabile, così articoli e figure restano semanticamente validi.
