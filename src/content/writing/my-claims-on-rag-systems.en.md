---
title: my claims on rag systems
description: Recently I implemented a RAG (Retrieval Augmented Generation) system and I learned a lot from the process. Some things were straightforward and worked as expected, others required different solutions than I initially thought. What follows are my personal claims and tips from real hands-on experience.
locale: en
slug: my-claims-on-rag-systems
publishedAt: '2025-09-11T16:10:07.000Z'
---

Recently I implemented a RAG (Retrieval Augmented Generation) system and I learned a lot from the process. Some things were straightforward and worked as expected, others required different solutions than I initially thought. What follows are my personal claims and tips from real hands-on experience. They might help you if you are building your own RAG setup.

- **Tabular data is not worth trying to store directly in embeddings.** The results are poor. If you want real use of tabular data you need an SQL agent.
- **PDF and text parsing is crucial.** At some point you will need tools like docling in order to correctly extract headers and also text from images. Without this the system accuracy will stop improving.
- **Chunking does not change much after semantic chunking.** Spending too much time adjusting chunk sizes will not give big improvements.
- **I used LangChain for all the RAG experiments.** Many LLMs provide outdated information about LangChain. If you are experimenting you can either check Context7 or read through the latest documentation yourself.
- **Tabular data with only a few columns is not a problem.** You can easily transform rows into text in the form of "Column1: a, Column2: b" and embed that text directly. This method works fine until you need to retrieve many columns at once.
- **The real solution for tabular data is SQL.** Store your table in a database such as SQLite for small cases or MySQL or Postgres for larger ones. Use an SQL agent to generate queries from your prompt. Feed the query results back to the LLM so it can formulate the final answer. LangChain already includes a built-in SQL agent. Realizing this was a eureka moment for me.
- **Sensitive data calls for local models.** For embeddings, QA models and other agents always prefer local deployment if you are handling sensitive data. Renting a GPU in the cloud is a good option for it.
- **Evaluation is always needed.** Create eval tests that cover almost every possible use case so that the system does not fail unexpectedly. For tabular data I generated SQL queries that produced the correct answers and then checked if the LLM responses contained that correct information.
- **Metadata is a huge factor.** Every file you ingest should include a few important fields like a sentence that describes it, its name and its date. Combining metadata with chunks makes retrieval more reliable and helps the LLM produce answers linked to the correct sources.
- **Reranking is an important step.** When working with higher top k values reranking is the method that keeps accuracy stable and results relevant.
