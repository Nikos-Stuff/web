---
title: "Regulamin Świadczenia Usług Hostingowych"
date: "11/23/2025"
---

# UWAGA: WERSJA ROBOCZA  
Niniejszy Regulamin jest wstępnym projektem i może ulec zmianie przed uruchomieniem płatności komercyjnych. Ostateczna wersja zostanie opublikowana po zakończeniu procesu formalnego oraz uzyskaniu pełnych danych firmy.

---

# Definicje

**Usługodawca / Administrator:**  
Maciej Frączek, prowadzący działalność gospodarczą pod firmą Niko’s Stuff,  
adres: *[adres zostanie uzupełniony]*  
NIP: *[do uzupełnienia]*  
REGON: *[do uzupełnienia]*  
zarejestrowany w CEIDG.  

**Serwis:**  
Strona internetowa **nikostuff.com** oraz wszystkie powiązane systemy, w tym Panel Klienta i Panel Serwerów.

**Usługa:**  
Udostępnienie zasobów serwerowych (CPU, RAM, przestrzeń dyskowa, przepustowość sieci) umożliwiających uruchamianie aplikacji lub serwerów gier w środowiskach dostarczonych przez Usługodawcę („jajkach”).

**Klient / Użytkownik:**  
Osoba fizyczna lub prawna korzystająca z Usług.

---

# 1. Akceptacja Regulaminu

Korzystając z Serwisu lub opłacając dowolną Usługę, Klient potwierdza, że zapoznał się z Regulaminem, rozumie jego treść i akceptuje wszystkie postanowienia.

---

# 2. Zakres i Charakter Usług

1. Usługodawca udostępnia zasoby serwerowe umożliwiające uruchamianie wyłącznie aplikacji dostępnych w formie **jajek** przygotowanych przez Usługodawcę.
2. Klient **nie może** dodawać własnych jajek, obrazów Docker ani modyfikować środowisk uruchomieniowych poza dostępną konfiguracją.
3. Klient może modyfikować pliki oraz konfigurację jedynie w obrębie środowisk oferowanych w Panelu.
4. Usługodawca działa jako **pośrednik (reseller)** infrastruktury zewnętrznych dostawców (np. OVH, Hetzner, Contabo).
5. Usługi są świadczone w modelu współdzielonym (overselling), z zachowaniem zasad stabilności i bezpieczeństwa.

---

# 3. Dopuszczalne Użytkowanie (AUP)

Klient zobowiązuje się korzystać z Usług zgodnie z prawem oraz zasadami bezpieczeństwa.

## 3.1. Zabronione działania

Zakazane jest m.in.:

- hostowanie treści nielegalnych lub naruszających prawa osób trzecich (pirackie oprogramowanie, malware, exploity, cheat’y),
- działania zakłócające pracę Serwisu lub infrastruktury osób trzecich (DDoS, botnety, skanowanie portów, spam, phishing),
- kopanie kryptowalut (mining),
- nadmierne lub ciągłe obciążanie zasobów, wpływające na innych użytkowników,
- odsprzedaż lub udostępnianie Usługi osobom trzecim bez zgody Usługodawcy.

## 3.2. Ograniczenia zasobów (Overselling)

W przypadku nadmiernego obciążenia systemu przez Klienta, Usługodawca może zastosować ograniczenia wydajności, tymczasowe zawieszenie instancji lub inne środki niezbędne do ochrony stabilności Serwisu.

---

# 4. Realizacja Usługi i Odpowiedzialność

## 4.1. Rola Usługodawcy

Usługodawca:
- udostępnia zasoby serwerowe i środowiska uruchomieniowe,
- zapewnia wsparcie techniczne dotyczące Panelu i jajek,
- pośredniczy w kontaktach z dostawcami infrastruktury, jeśli wystąpią problemy niezależne od niego.

## 4.2. Odpowiedzialność Klienta

Klient ponosi pełną odpowiedzialność za:
- treści i pliki wgrywane na serwer,
- konfigurację instancji,
- działania użytkowników korzystających z uruchomionych przez niego aplikacji,
- szkody wyrządzone osobom trzecim.

Usługodawca nie odpowiada za:
- treści hostowane przez Klienta,
- awarie wynikające z błędnej konfiguracji,
- działania aplikacji uruchomionych przez Klienta.

## 4.3. Dostępność Usług (SLA)

Usługodawca dokłada starań, aby zapewnić wysoką dostępność, lecz nie gwarantuje nieprzerwanego działania systemu.  
Awaria infrastruktury partnerów zewnętrznych stanowi zdarzenie niezależne od Usługodawcy.

---

# 5. Kopie Zapasowe

1. Usługodawca co do zasady **nie zapewnia automatycznych kopii zapasowych**, chyba że dana oferta stanowi inaczej.
2. Klient odpowiada za samodzielne wykonywanie i przechowywanie kopii zapasowych.
3. Po usunięciu Serwera wszystkie dane (w tym kopie) są bezpowrotnie usuwane.

---

# 6. Płatności i Odnawianie Usług

1. Usługi są rozliczane w cyklach 30-dniowych (lub innych, jeśli podano w ofercie).
2. Operatorem płatności jest **Stripe**. Usługodawca nie przetwarza danych kart płatniczych.
3. Usługi **nie odnawiają się automatycznie**. Po zakończeniu opłaconego okresu Klient musi dokonać manualnej opłaty.
4. Przedłużenie Usługi następuje po zaksięgowaniu płatności — **również o wartości 0 PLN**, jeżeli spełnione są warunki z punktu 6.5.
5. **Zasada odnawiania za 0 PLN (kredyt):**
    - W przypadku zmiany konfiguracji (downgrade), niewykorzystany czas przekształcany jest w **kredyt**.
    - Jeśli cena przedłużenia wynosi 0 PLN:
        - przedłużenie o nowy cykl 30 dni nastąpi **tylko wtedy, gdy do końca ważności usługi pozostało mniej niż 5 dni**,  
        - w przeciwnym razie data wygaśnięcia **pozostaje bez zmian**, a aktualizowane są wyłącznie zasoby serwera.
6. Brak opłaty po upływie terminu skutkuje zawieszeniem usługi zgodnie z sekcją 8.

---

# 7. Rezygnacja i Zwroty

1. Klient może zrezygnować z usługi w dowolnym momencie.
2. Po zakończeniu opłaconego okresu usługa pozostaje aktywna jeszcze przez **7 dni** (okres karencji). Po tym czasie jest usuwana.
3. Usługodawca nie udziela zwrotów za niewykorzystany czas trwania usługi.
4. Zwroty mogą być przyznane wyłącznie w szczególnych przypadkach według uznania Usługodawcy.
5. Usługi bezpłatne (testowe, promocyjne) wygasają automatycznie i nie podlegają wznowieniu. Po wygaśnięciu dane są usuwane.

---

# 8. Zawieszenie i Usunięcie Usługi

1. Usługa zostaje **zawieszona** w ciągu 24 godzin od upływu terminu płatności.
2. Jeśli płatność nie zostanie uregulowana w ciągu **7 dni od zawieszenia**, serwer oraz wszystkie dane zostaną trwale usunięte.
3. Usługodawca może zakończyć świadczenie Usługi natychmiast, bez zwrotu środków, w szczególności w przypadku:
    - naruszenia prawa,
    - naruszenia zasad z sekcji 3.1,
    - nadużywania zasobów,
    - działań zagrażających stabilności Serwisu.

---

# 9. Reklamacje

1. Klient może zgłaszać reklamacje na adres e-mail: **[adres do uzupełnienia]**.
2. Reklamacje rozpatrywane są w terminie do **14 dni roboczych**.
3. Odpowiedź udzielana jest w formie elektronicznej.

---

# 10. Ochrona Danych Osobowych (RODO)

1. Zasady przetwarzania danych osobowych określa **Polityka Prywatności**, dostępna w Serwisie.
2. Korzystanie z Usług oznacza akceptację Polityki Prywatności.

---

# 11. Siła Wyższa

Usługodawca nie odpowiada za niewykonanie lub nienależyte wykonanie Usługi spowodowane działaniem siły wyższej, w tym m.in.: awariami infrastruktury, katastrofami naturalnymi, konfliktami zbrojnymi, przerwami w dostawach prądu lub Internetu.

---

# 12. Postanowienia Końcowe

1. Usługodawca może wprowadzać zmiany w Regulaminie. Zmiany obowiązują od chwili publikacji w Serwisie.
2. Do korzystania z Usług stosuje się prawo Rzeczypospolitej Polskiej.
3. W sprawach nieuregulowanych zastosowanie mają odpowiednie przepisy prawa polskiego.

---
