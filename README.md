# TripFlow 2.0 - osobní cestovní databáze

TripFlow 2.0 je statická, instalovatelná PWA. Řím je předvyplněný jako první cesta, ale stejná aplikace spravuje i další itineráře.

## Co obsahuje verze 2.0

- více cest v jedné aplikaci,
- předvyplněný Řím 12.-15. 10. 2026,
- denní plán, adresy, ceny, fotografie a odkazy na rezervace,
- Google Maps trasy,
- databázový přehled povinných rezervací,
- stav rezervováno / čeká,
- rozpočet podle kategorií a měn,
- vytváření cest, dnů a zastávek,
- editace itineráře přímo v telefonu,
- export/obnova databáze v JSON,
- import JSON generovaného Copilotem,
- local-first ukládání a základní offline režim.

## Důležité omezení této edice

GitHub Pages je statický hosting. Data se proto v této edici ukládají pouze do konkrétního prohlížeče/zařízení. Pro přenos nebo zálohu použijte Export JSON. Sdílená synchronizace mezi dvěma telefony vyžaduje pozdější cloudovou vrstvu (např. Supabase, Firebase nebo vlastní API). Tato funkce není v balíčku simulována.

## Publikování na GitHub Pages

1. Vytvořte veřejný repozitář, například `tripflow`.
2. Nahrajte obsah této složky do kořene repozitáře.
3. V GitHubu otevřete Settings > Pages.
4. Source: Deploy from a branch.
5. Branch: main, folder: / (root), Save.
6. Otevřete publikovanou HTTPS adresu.

## Instalace

- iPhone/iPad: Safari > Sdílet > Přidat na plochu.
- Android: Chrome > nabídka > Instalovat aplikaci.

## Import budoucí cesty z Copilotu

1. Přiložte Copilotu `tripflow.schema.json`.
2. Použijte zadání v `COPILOT_PROMPT.md`.
3. Uložte výsledek jako JSON.
4. TripFlow > nabídka (…) > Import JSON.

## Test lokálně

```bash
python3 -m http.server 8080 --directory tripflow_v2
```

Otevřete `http://localhost:8080`.
