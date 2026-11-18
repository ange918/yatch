# Finanzkredit

Site vitrine (React 19, Vite, Tailwind) déployé en statique sur Vercel. Les demandes saisies sur le site partent par e-mail grâce à la fonction serverless Node `api/contact`.

## Lancer le site

```bash
npm install
npm run dev:api
npm run dev
```

Le site est sur [http://localhost:5000](http://localhost:5000). Vite proxifie `/api` vers le serveur local du port 3001. `changeOrigin` reste désactivé pour que l’en-tête `Host` soit celui du site : la fonction refuse une origine qui ne correspond pas.

```bash
npm test
npm run build
```

## Formulaires branchés

- **`/contact`** — demande de crédit. Le simulateur (`/simulation`) n’a pas de formulaire propre : il ouvre `/contact` avec le montant, la durée et le produit (`subject=auto`, `privat` ou `loan` pour l’immobilier). Ces valeurs partent dans l’e-mail.
- **`/kredite/:slug`** — demande depuis une fiche offre.

La confirmation s’affiche seulement si `POST /api/contact` répond `{ "ok": true }`. Sinon le formulaire reste en place et un message d’erreur (DE, FR, NL, EN) s’affiche.

## Variables d’environnement

À renseigner dans Vercel (**Settings → Environment Variables**), pour Production et Preview. Le fichier [`.env.example`](.env.example) liste les mêmes noms. Ne jamais committer de clé : `.env` est ignoré.

| Variable | Rôle |
| --- | --- |
| `CONTACT_TO_EMAIL` | Destinataire. Défaut `contact@krediiwelt.com` si la variable est absente. |
| `RESEND_API_KEY` | Clé API Resend. Si elle est définie, Resend est utilisé, même si SMTP est aussi rempli. |
| `MAIL_FROM` | Expéditeur, par exemple `Finanzkredit <contact@krediiwelt.com>`. Obligatoire avec Resend. L’adresse doit être sur le domaine vérifié. |
| `SMTP_HOST` | Hôte SMTP. Ignoré tant que `RESEND_API_KEY` est défini. |
| `SMTP_PORT` | `587` (STARTTLS) ou `465` (TLS). |
| `SMTP_USER` | Identifiant SMTP. Sert aussi d’expéditeur si `MAIL_FROM` est vide. |
| `SMTP_PASS` | Mot de passe SMTP. |

Le `Reply-To` de chaque e-mail est l’adresse saisie par le client. Le corps (HTML et texte) reprend tous les champs, la page d’origine et la langue du site.

Sans aucune de ces variables, la fonction répond une erreur et le formulaire n’affiche pas de succès.

## Vérifier krediiwelt.com chez Resend

Resend n’envoie qu’avec un domaine qui vous appartient. Aucun compte n’est créé par ce dépôt.

1. Créer un compte sur [resend.com](https://resend.com), puis **Domains → Add domain**.
2. Ajouter `krediiwelt.com`. Pour des destinataires en Europe, choisir la région `eu-west-1` si elle est proposée.
3. Ouvrir l’onglet **Records** et copier les enregistrements DNS **tels quels** chez le registrar du domaine. Le jeu dépend de la date d’ajout du domaine :
   - **DKIM** : un TXT sur `resend._domainkey` (nom complet `resend._domainkey.krediiwelt.com`). La valeur `p=...` vient uniquement du tableau de bord, il ne faut ni la tronquer ni l’entourer de guillemets en trop.
   - **SPF**, domaines plus anciens : sur le sous-domaine `send` (donc `send.krediiwelt.com`), un MX `10 feedback-smtp.<region>.amazonses.com` **et** un TXT du type `v=spf1 include:amazonses.com ~all`. La région du MX doit être celle choisie à l’étape 2.
   - **SPF**, domaines ajoutés après août 2026 : Resend peut afficher des CNAME (`send`, et parfois `rsend`) à la place du MX/TXT. Les coller tels quels, **sans proxy** (chez Cloudflare : DNS only, nuage gris).
4. Ajouter un DMARC conseillé, TXT sur `_dmarc` : `v=DMARC1; p=none; rua=mailto:contact@krediiwelt.com`. On pourra durcir `p=` plus tard.
5. Attendre la propagation (souvent moins de 15 minutes, parfois jusqu’à 72 h), puis **Verify** ou **Restart verification**.
6. Contrôler depuis un terminal, en remplaçant les noms par ceux affichés par Resend :

```bash
nslookup -type=TXT resend._domainkey.krediiwelt.com
nslookup -type=TXT send.krediiwelt.com
nslookup -type=MX send.krediiwelt.com
```

Si le tableau de bord montre des CNAME, vérifier ceux-là (`nslookup -type=CNAME send.krediiwelt.com`) plutôt que le MX.

7. Créer une clé API limitée à l’envoi, la coller dans `RESEND_API_KEY`, et mettre `MAIL_FROM` sur une adresse de `krediiwelt.com`. Redéployer pour que la fonction prenne les variables.

## Essai local

Sans clé, `npm run dev:api` **simule** l’envoi : le message est écrit dans le terminal, aucun e-mail ne part. Une adresse qui commence par `erreur@` force l’échec, pour vérifier le message d’erreur du formulaire.

Avec un `.env` (non versionné) qui contient `RESEND_API_KEY` et `MAIL_FROM`, ou les quatre variables SMTP, le serveur local envoie réellement. `MAIL_FROM` doit alors être une adresse déjà autorisée chez le fournisseur.

L’anti-spam rejette un formulaire envoyé en moins de 3 secondes, un champ caché rempli (honeypot) et, en production, plus de 5 envois par adresse IP et par 15 minutes. Ce plafond est en mémoire dans chaque instance Vercel : il freine un abus simple, il ne partage pas un compteur entre instances. Le serveur local monte le plafond à 30 requêtes par minute pour les essais.

Le rewrite SPA de `vercel.json` est `/((?!api/).*)` → `/index.html`. Il ne s’applique pas à `/api/contact`, qui reste la fonction Node.
