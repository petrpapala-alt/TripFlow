# Prompt pro export itineráře do TripFlow

Použij následující zadání v Copilotu po dokončení cestovního research:

> Převeď finální itinerář do JSON podle přiloženého souboru `tripflow.schema.json`. Výstup musí být pouze validní JSON pole bez Markdownu a bez komentářů. Zachovej přesné adresy, ověřené ceny, oficiální rezervační odkazy, pořadí zastávek, vzdálenost, čistý čas chůze a poznámky. Pro každé placené nebo kapacitně omezené místo nastav `reservationRequired`. Pokud je rezervace již potvrzená, nastav `reserved: true`. Nevymýšlej chybějící údaje; použij prázdný řetězec nebo nulu.

Výstup ulož jako `.json` a v TripFlow použij **Nástroje > Import JSON**.
