# TripFlow 4 – sdílené PWA se Supabase

TripFlow je statická PWA pro GitHub Pages. Funguje local-first: změna se nejdřív uloží do prohlížeče a po přihlášení se synchronizuje do Supabase.

## Co je implementované

- přihlášení přes jednorázový e-mailový Magic Link,
- více cloudových cest na jednom účtu,
- automatický první přesun lokálních cest do cloudu,
- role `owner`, `editor` a `viewer` chráněné pomocí Row Level Security,
- pozvánky omezené na e-mail nebo sdílené pomocí odkazu,
- realtime synchronizace itinerářů a stavů zastávek,
- offline lokální fronta změn s automatickým odesláním po návratu připojení,
- společné stavy „navštíveno“ a „rezervováno“ uložené odděleně od itineráře,
- soukromé PDF, obrázky, QR vstupenky a jiné dokumenty v Supabase Storage,
- import/export JSON a znovu zapnuté vytváření cest, dnů, zastávek a úpravy rozpočtu,
- původní PWA instalace a offline app shell.

## Jednorázové nastavení Supabase

Projekt už má platnou konfiguraci v `supabase-config.js`:

- Project URL: `https://shwcetghfyabdrxsolok.supabase.co`
- publishable key: už je uložený v souboru

Publishable/anon klíč smí být ve frontendovém kódu. Přístup k datům zabezpečuje RLS. Do repozitáře nikdy nevkládejte `service_role` ani secret key.

### 1. Vytvoření tabulek a pravidel

1. Otevřete [Supabase Dashboard](https://supabase.com/dashboard/project/shwcetghfyabdrxsolok).
2. V levém menu zvolte **SQL Editor** a **New query**.
3. Zkopírujte celý obsah [`supabase/schema.sql`](./supabase/schema.sql), vložte jej do editoru a spusťte přes **Run**.
4. Výsledkem musí být hláška o úspěšném dokončení bez chyby.

Schéma používá vlastní názvy `tripflow_*`. Starší tabulka `trips`, která v projektu už existuje v jiné struktuře, zůstane nedotčená a nová aplikace ji nepoužívá.

### 2. Povolené adresy pro Magic Link

V Supabase otevřete **Authentication → URL Configuration** a nastavte:

- **Site URL:** `https://petrpapala-alt.github.io/TripFlow/`
- **Redirect URLs:**
  - `https://petrpapala-alt.github.io/TripFlow/**`
  - `http://localhost:8080/**`

E-mail provider je v tomto projektu už zapnutý. Výchozí Supabase e-mailová služba stačí pro první testy; pro spolehlivé produkční doručování je vhodné později nastavit vlastní SMTP.

### 3. Publikování

Po nahrání změn do větve `main`:

1. v GitHubu otevřete **Settings → Pages**,
2. zvolte **Deploy from a branch**,
3. vyberte `main` a `/ (root)`,
4. otevřete `https://petrpapala-alt.github.io/TripFlow/`.

## První přihlášení a migrace

1. Otevřete ikonu účtu vpravo nahoře.
2. Zadejte e-mail a otevřete přijatý odkaz na stejném zařízení.
3. Pokud účet ještě nemá cloudové cesty, aplikace automaticky nahraje aktuální lokální cesty.
4. Před migrací uloží lokální kopii také do `localStorage` pod klíčem `tripflow.preCloudBackup`.

Pokud už účet cloudové cesty má, mají přednost ony. Lokální JSON lze kdykoli přidat přes **Nástroje → Import JSON**.

## Sdílení a dokumenty

- Sdílet může vlastník cesty přes **Nástroje → Sdílení**.
- Pozvánka s e-mailem funguje jen pro daný účet; pozvánka bez e-mailu je přenositelný odkaz a je méně bezpečná.
- Vlastník může měnit roli nebo účastníka odebrat.
- Dokumenty lze uložit k celé cestě nebo ke konkrétní zastávce. Bucket je privátní a aplikace otevírá soubor pomocí krátkodobého podepsaného odkazu.

## Lokální test

```bash
python3 -m http.server 8080
```

Potom otevřete `http://localhost:8080/`. Supabase Magic Link na localhost funguje jen tehdy, když je výše uvedená localhost adresa v Redirect URLs.

## Známé limity

- Offline lze upravovat itinerář a stav zastávek, ale dokument nelze bez připojení nahrát ani nově otevřít.
- Navštíveno/rezervováno se synchronizuje po samostatných zastávkách. Samotná struktura itineráře je verzovaný JSON; při velmi vzácné souběžné úpravě stejné cesty na dvou zařízeních aplikace zopakuje poslední lokální zápis. Pro malou rodinnou aplikaci je to rozumný kompromis, ne však model pro desítky současných editorů.
- Service worker ukládá app shell a již navštívené GET zdroje, ne však kompletní obsah Supabase Storage.
- Produkční e-mailové doručování je vhodné přepnout na vlastní SMTP a pozvánky vytvářet pro konkrétní e-mail.
