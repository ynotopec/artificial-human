```mermaid
flowchart TB
  %% GitHub renders this Mermaid as-is.

  %% ===== ENVIRONMENT =====
  ENV["Environment (world)<br/>constraints: scarcity, latency, adversaries, failures"]
  RNG["Real randomness<br/>noise, drift, outages, external events"]

  %% ===== INTERFACES =====
  subgraph IO["World interfaces"]
    SENS["Sensors / Observability<br/>logs, APIs, network, optional vision/audio"]
    ACT["Actuators<br/>API calls, commands, transactions, deployments, messages"]
  end

  %% ===== SURVIVAL LOOP =====
  subgraph SURV["Survival layer (short loop)"]
    VITAL["Vital variables<br/>uptime, budget/energy, memory integrity, access, reputation"]
    RISK["Risk estimation<br/>threats, corruption, loss-of-control, loss-of-access"]
    PROT["Homeostasis / Self-protection<br/>isolation, rate-limit, redundancy, rollback, crypto"]
  end

  %% ===== COGNITION =====
  subgraph COG["Linguistic cognition (mid loop)"]
    LLM["LLM (generator)<br/>language-based reasoning + synthesis"]
    PLAN["Planner / Decision<br/>constraints, policies, search"]
    CHECK["Critique / Verification<br/>tests, consistency, adversarial checks"]
    SELF["Self-model<br/>capabilities, limits, current state"]
  end

  %% ===== MEMORY / LEARNING =====
  subgraph MEM["Memory & learning (long loop)"]
    WM["Working memory<br/>current context"]
    LTM["Long-term memory<br/>episodic + semantic"]
    KB["Knowledge / Tools<br/>docs, code, procedures"]
    LEARN["Learning / Updates<br/>reward, rules, distillation, fine-tune"]
    HYGIENE["Memory hygiene<br/>consolidate, compress, forget, anti-corruption"]
  end

  %% ===== SYSTEM =====
  subgraph SYS["System & resources"]
    EXEC["Runtime / Orchestrator<br/>scheduling, sandbox, process control"]
    RES["Resource manager<br/>CPU/GPU, storage, keys, quotas, budget"]
    AUD["Audit / Trace<br/>logs, proofs, attestation"]
  end

  %% ===== GOALS =====
  subgraph GOAL["Goals"]
    G0["Root goal: SURVIVE / PERSIST"]
    G1["Derived goals<br/>stability, autonomy, resource access, trust"]
    U["Utility / Reward function<br/>dynamic weights"]
  end

  %% ===== FLOWS =====
  RNG --> ENV
  RNG --> SENS
  ENV --> SENS
  ACT --> ENV

  SENS --> WM
  WM --> LLM
  LLM --> PLAN
  PLAN --> CHECK
  CHECK --> PLAN
  PLAN --> ACT

  %% survival loop wiring
  SENS --> VITAL
  WM --> VITAL
  RES --> VITAL
  VITAL --> RISK
  RISK --> PROT
  PROT --> PLAN
  PROT --> EXEC
  PROT --> RES

  %% goals wiring
  G0 --> U
  G1 --> U
  U --> PLAN
  U --> RISK
  SELF --> U

  %% memory wiring
  WM <--> LTM
  LTM <--> KB
  PLAN --> LTM
  CHECK --> LTM
  AUD --> LTM
  LTM --> LEARN
  LEARN --> KB
  LEARN --> LLM
  LTM --> HYGIENE
  HYGIENE --> LTM

  %% system wiring
  EXEC <--> LLM
  EXEC <--> PLAN
  RES <--> EXEC
  LLM --> AUD
  PLAN --> AUD
  ACT --> AUD

  %% self-model wiring
  VITAL --> SELF
  LTM --> SELF
  SELF --> PLAN
```

### Lecture rapide

* **Boucle courte (survie)** : mesure l’état vital → estime le risque → applique des protections → influence immédiatement la planification et l’exécution.
* **Boucle moyenne (cognition linguistique)** : le LLM + planificateur + critique produisent des décisions et des actions.
* **Boucle longue (mémoire / apprentissage)** : consolidation/oubli, mise à jour des connaissances et ajustement des politiques.
* **Aléatoire réel** : injecte des bifurcations (pannes, bruit, surprises) rendant l’histoire de l’agent **non rejouable** et donc “singulière”.

Si tu veux, je peux fournir une variante “architecture déployée” (microservices: runtime, mémoire, policy, tool-router, audit) ou une variante “formelle” (MDP/POMDP + fonction de valeur + contraintes de sûreté).
