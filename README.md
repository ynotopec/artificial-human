```mermaid
flowchart TD
  %% ========= ENVIRONNEMENT =========
  W[(Monde physique / réseau / économie<br/>Contraintes: énergie, latence, panne, adversaires, rareté, bruit)]
  RND[[Aléatoire réel<br/>bruit, pannes, dérives, événements externes]]

  %% ========= PERCEPTION / I/O =========
  subgraph IO[Interfaces monde]
    SENS[Capteurs / Observateurs<br/>logs, API, réseau, vision/audio (option)]
    ACT[Actionneurs<br/>API, commandes, transactions, déploiements, messages]
  end

  %% ========= NIVEAU "SURVIE" =========
  subgraph SURV[Couche Survie (boucle courte)]
    VITAL[Variables vitales<br/>uptime, énergie/budget, intégrité mémoire, accès réseau, crédibilité]
    RISK[Évaluation risque<br/>menaces, dérive, corruption, perte d'accès]
    HOME[Homéostasie / Auto-protection<br/>rate-limit, isolation, rollback, redondance, chiffrement]
  end

  %% ========= COGNITION SYMBOLIQUE =========
  subgraph COG[Cognition linguistique (boucle moyenne)]
    LLM[Modèle génératif (LLM)<br/>raisonnement, synthèse, dialogue interne]
    PLAN[Planification / Décision<br/>HTN, MCTS, règles, contraintes]
    CRIT[Critique & vérification<br/>tests, consistency-check, adversarial self-check]
    SM[Modèle de soi<br/>capacités, limites, état courant, historique]
  end

  %% ========= MÉMOIRE / CONNAISSANCES =========
  subgraph MEM[Mémoire & apprentissage (boucle longue)]
    WM[Mémoire de travail<br/>contexte courant]
    LTM[Mémoire long terme<br/>épisodique + sémantique]
    KB[Base de connaissances / outils<br/>docs, code, schémas, procédures]
    LEARN[Apprentissage / mise à jour<br/>récompense, fine-tune, distillation, règles]
    GC[Hygiène mémoire<br/>compression, consolidation, oubli, anti-corruption]
  end

  %% ========= RESSOURCES / EXÉCUTION =========
  subgraph SYS[Système & ressources]
    EXEC[Runtime / Orchestrateur<br/>process, sandbox, scheduling]
    RES[Gestion ressources<br/>CPU/GPU, stockage, clés, budget, quotas]
    AUD[Audit / traçabilité<br/>journaux, preuves, attestation]
  end

  %% ========= OBJECTIFS =========
  subgraph GOAL[Objectifs]
    G0[But racine: SURVIVRE / PERSISTER]
    G1[Objectifs dérivés<br/>stabilité, autonomie, acquisition ressources, réputation]
    UTIL[Fonction d'utilité / récompense<br/>pondérations dynamiques]
  end

  %% ========= FLUX =========
  W --> SENS
  RND --> W
  RND --> SENS
  SENS --> WM
  WM --> LLM
  LLM --> PLAN
  PLAN --> CRIT
  CRIT --> PLAN
  PLAN --> ACT
  ACT --> W

  %% survie
  SENS --> VITAL
  WM --> VITAL
  VITAL --> RISK
  RISK --> HOME
  HOME --> PLAN
  HOME --> EXEC
  HOME --> RES

  %% objectifs
  G0 --> UTIL
  G1 --> UTIL
  UTIL --> PLAN
  UTIL --> RISK

  %% mémoire
  WM <--> LTM
  LTM <--> KB
  PLAN --> LTM
  CRIT --> LTM
  LTM --> LEARN
  LEARN --> KB
  LEARN --> LLM
  LTM --> GC
  GC --> LTM

  %% système
  EXEC <--> LLM
  EXEC <--> PLAN
  RES <--> EXEC
  RES --> VITAL
  AUD <-- LLM
  AUD <-- PLAN
  AUD <-- ACT
  AUD --> LTM

  %% modèle de soi
  VITAL --> SM
  LTM --> SM
  SM --> PLAN
  SM --> UTIL
```

### Lecture rapide

* **Boucle courte (survie)** : mesure l’état vital → estime le risque → applique des protections → influence immédiatement la planification et l’exécution.
* **Boucle moyenne (cognition linguistique)** : le LLM + planificateur + critique produisent des décisions et des actions.
* **Boucle longue (mémoire / apprentissage)** : consolidation/oubli, mise à jour des connaissances et ajustement des politiques.
* **Aléatoire réel** : injecte des bifurcations (pannes, bruit, surprises) rendant l’histoire de l’agent **non rejouable** et donc “singulière”.

Si tu veux, je peux fournir une variante “architecture déployée” (microservices: runtime, mémoire, policy, tool-router, audit) ou une variante “formelle” (MDP/POMDP + fonction de valeur + contraintes de sûreté).
