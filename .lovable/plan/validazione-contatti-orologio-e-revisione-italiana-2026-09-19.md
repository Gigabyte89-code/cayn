# Validazione contatti, orologio e revisione italiana

## Obiettivo
Rendere il modulo più chiaro, ripristinare l’orario italiano nel footer e riscrivere l’intera versione italiana con un tono naturale e professionale.

## Modifiche previste
- Aggiungere una validazione lato browser dedicata al campo email prima dell’invio.
  - Se manca `@`, mostrare sotto al campo: “L’indirizzo email non è valido: manca la @”.
  - Mantenere separati gli altri errori del modulo e rimuovere l’errore appena l’indirizzo viene corretto.
  - Fornire lo stesso comportamento anche in inglese con un messaggio equivalente.
- Correggere l’orologio nel footer.
  - Calcolare l’ora con il fuso `Europe/Rome` dopo il caricamento della pagina.
  - Aggiornarla in tempo reale e mostrare sempre ore e minuti nel formato corretto.
  - Evitare che rimanga bloccato su `--:--`.
- Riscrivere tutti i testi italiani centralizzati, inclusi Home, Chi sono, Servizi, Progetti, FAQ, Contatti, footer, avvisi, messaggi del modulo e metadati.
  - Conservare significato, dati, prezzi, tempi e tono del sito.
  - Eliminare calchi dall’inglese e rendere frasi, CTA e microtesti più idiomatici.
  - Lasciare invariata la versione inglese, salvo l’aggiunta del nuovo messaggio di validazione.

## Verifica
- Provare l’invio con email senza `@`, verificando che il messaggio compaia sotto al campo e che il modulo non venga inviato.
- Verificare l’orario reale di Roma nel footer e il suo aggiornamento.
- Controllare le sei pagine in italiano su desktop e mobile, oltre alla compilazione del progetto.
