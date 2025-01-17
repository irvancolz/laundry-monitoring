SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 15.6
-- Dumped by pg_dump version 15.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: laundry_branch; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."laundry_branch" ("id", "name", "code", "contact", "open_hour", "close_hour", "is_washing_station", "address", "created_at", "created_by", "updated_at", "updated_by", "deleted_at", "deleted_by", "is_deleted") OVERRIDING SYSTEM VALUE VALUES
	(4, 'Westside Station', 'WS004', NULL, NULL, NULL, true, '321 Pine Street, Westside', '2024-12-19 20:31:06.118495+07', NULL, NULL, NULL, NULL, NULL, false),
	(5, 'Eastside Pickup', 'EP005', NULL, NULL, NULL, false, '654 Maple Road, Eastside', '2024-12-19 20:31:06.118495+07', NULL, NULL, NULL, NULL, NULL, false),
	(3, 'Midtown Collection', 'MC003', NULL, NULL, NULL, false, '789 Oak Lane, Midtown', '2024-12-19 20:31:06.118495+07', NULL, '2025-01-14 14:34:49+07', 'PLACEHOLDER', NULL, NULL, false),
	(6, 'cabang baru', 'BRN006', '12345678', NULL, NULL, true, 'jl 123', '2025-01-14 14:29:07+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(2, 'Uptown Laundry', 'UL002', NULL, '07:00', '17:20', false, '456 Elm Avenue, Uptown', '2024-12-19 20:31:06.118495+07', NULL, '2025-01-14 14:47:33+07', 'PLACEHOLDER', NULL, NULL, false),
	(1, 'Downtown Laundry', 'DL001', NULL, '07:15', '19:00', true, '123 Main Street, Downtown', '2024-12-19 20:31:06.118495+07', NULL, '2025-01-14 14:56:42+07', 'PLACEHOLDER', NULL, NULL, false);


--
-- Data for Name: laundry_service; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."laundry_service" ("id", "name", "pricing_type", "code", "service_time_hour", "price", "created_at", "created_by", "updated_at", "updated_by", "deleted_at", "deleted_by", "is_deleted") OVERRIDING SYSTEM VALUE VALUES
	(2, 'Cuci Sepatu', 'piece', 'LS002', 72, 70000, '2024-12-19 20:31:06.125632+07', NULL, NULL, NULL, NULL, NULL, false),
	(4, 'Setrika Saja', 'piece', 'LS004', 24, 25000, '2024-12-19 20:31:06.125632+07', NULL, NULL, NULL, NULL, NULL, false),
	(5, 'Cuci dan Kering', 'weight', 'LS005', 36, 40000, '2024-12-19 20:31:06.125632+07', NULL, NULL, NULL, NULL, NULL, false),
	(14, 'delte', 'weight', 'SVC014', 32, 123, '2024-12-31 18:57:35+07', 'PLACEHOLDER', NULL, NULL, '2024-12-31 18:57:43+07', 'PLACEHOLDER', true),
	(15, 'delete', 'piece', 'SVC015', 12, 123456, '2024-12-31 18:58:23+07', 'PLACEHOLDER', NULL, NULL, '2024-12-31 18:58:40+07', 'PLACEHOLDER', true),
	(6, 'Cuci Ekspres', 'weight', 'LS006', 12, 80000, '2024-12-19 20:31:06.125632+07', NULL, NULL, NULL, '2024-12-31 17:23:06+07', 'PLACEHOLDER', true),
	(7, 'Cuci Karpet', 'piece', 'LS007', 12, 50000, '2024-12-19 20:31:06.125632+07', NULL, NULL, NULL, '2024-12-31 17:22:13+07', 'PLACEHOLDER', true),
	(1, 'Cuci Lengkap', 'weight', 'LS001', 12, 50000, '2024-12-19 20:31:06.125632+07', NULL, '2024-12-31 19:24:04+07', 'PLACEHOLDER', NULL, NULL, false),
	(8, 'Service Baru', 'weight', 'SVC008', 5, 2000, '2024-12-30 20:27:05+07', 'PLACEHOLDER', '2024-12-31 11:25:37+07', 'PLACEHOLDER', '2024-12-31 17:22:07+07', 'PLACEHOLDER', true),
	(9, 'hapus ini', 'piece', 'SVC009', 12, 234, '2024-12-31 17:25:31+07', 'PLACEHOLDER', NULL, NULL, '2024-12-31 17:25:48+07', 'PLACEHOLDER', true),
	(10, 'hapus', 'weight', 'SVC010', 13, 45636, '2024-12-31 17:26:51+07', 'PLACEHOLDER', NULL, NULL, '2024-12-31 17:27:10+07', 'PLACEHOLDER', true),
	(11, 'hapus lagi', 'piece', 'SVC011', 12, 324234, '2024-12-31 17:28:20+07', 'PLACEHOLDER', NULL, NULL, '2024-12-31 17:34:51+07', 'PLACEHOLDER', true),
	(12, 'delete', 'weight', 'SVC012', 12, 234542, '2024-12-31 18:47:31+07', 'PLACEHOLDER', NULL, NULL, '2024-12-31 18:54:27+07', 'PLACEHOLDER', true),
	(13, 'delete this', 'weight', 'SVC013', 21, 23456, '2024-12-31 18:55:27+07', 'PLACEHOLDER', NULL, NULL, '2024-12-31 18:55:36+07', 'PLACEHOLDER', true),
	(3, 'Cuci Saja', 'weight', 'LS003', 19, 30000, '2024-12-19 20:31:06.125632+07', NULL, '2025-01-02 10:34:42+07', 'PLACEHOLDER', NULL, NULL, false);


--
-- Data for Name: laundry_order; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."laundry_order" ("id", "code", "branch_id", "branch_name", "service_id", "service_name", "status", "customer_name", "finish_expectation", "qty", "price", "notes", "created_at", "created_by", "updated_at", "updated_by", "deleted_at", "deleted_by", "is_deleted") VALUES
	('56259aa4-f743-440c-9863-0d66c38dcb73', 'LS0061734664560', 5, 'Eastside Pickup', 6, 'Cuci Ekspres', 'onprogress', 'gilang ekspress', '2024-12-21 05:16:00+07', 2, 160000, NULL, '2024-12-20 17:16:00+07', NULL, NULL, NULL, NULL, NULL, false),
	('a1adbdf0-17fc-4520-9613-53381e431c85', 'LS0061734664680', 5, 'Eastside Pickup', 6, 'Cuci Ekspres', 'onprogress', 'memet sumpit', '2024-12-21 05:18:00+07', 3, 240000, NULL, '2024-12-20 17:18:00+07', NULL, NULL, NULL, NULL, NULL, false),
	('448917f7-b4ec-4b99-90d3-27798768ca7c', 'LS0021734615180', 4, 'Westside Station', 2, 'Cuci Sepatu', 'onprogress', 'joko westside dirubah', '2024-12-23 03:33:00+07', 1.5, 105000, 'catatan yang lumayan panjang hehe', '2024-12-20 03:33:00+07', NULL, '2024-12-20 18:12:37+07', 'PLACEHOLDER', NULL, NULL, false),
	('63d5f1cc-36cb-4b15-8a2c-fbd93e7ecab2', 'LS0071734664500', 5, 'Eastside Pickup', 7, 'Cuci Karpet', 'canceled', 'ucup eastside', '2024-12-21 05:15:00+07', 2, 100000, NULL, '2024-12-20 17:15:00+07', NULL, NULL, NULL, NULL, NULL, false),
	('91b278cd-920d-49c0-a891-ec62ee5b3d42', 'SVC0081735565220', 1, 'Downtown Laundry', 8, 'Service Baru', 'canceled', 'Rahmat Jukir', '2024-12-31 00:27:00+07', 3, 3000, NULL, '2024-12-30 20:27:00+07', 'PLACEHOLDER', '2024-12-31 21:40:12+07', 'PLACEHOLDER', NULL, NULL, false),
	('d216d355-e189-4579-b9e0-9b271e65aefe', 'LS0041734664740', 3, 'Midtown Collection', 4, 'Setrika Saja', 'finished', 'juli midtown lagi', '2024-12-21 17:19:00+07', 2, 50000, 'hello boys', '2024-12-20 17:19:00+07', NULL, '2024-12-20 11:20:30+07', 'PLACEHOLDER', NULL, NULL, false);


--
-- Data for Name: order_task; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."order_task" ("id", "name", "code", "order", "description", "created_at", "created_by", "updated_at", "updated_by", "deleted_at", "deleted_by", "is_deleted") OVERRIDING SYSTEM VALUE VALUES
	(2, 'Penyortiran', 'OT002', 1, 'Pakaian Anda sedang kami sortir berdasarkan jenis dan warnanya.', '2024-12-19 20:31:06.12333+07', NULL, NULL, NULL, NULL, NULL, false),
	(3, 'Pencucian', 'OT003', 2, 'Pakaian Anda sedang dicuci menggunakan metode yang sesuai.', '2024-12-19 20:31:06.12333+07', NULL, NULL, NULL, NULL, NULL, false),
	(5, 'Penyetrikaan', 'OT005', 4, 'Pakaian Anda sedang disetrika, sebentar lagi siap untuk diambil.', '2024-12-19 20:31:06.12333+07', NULL, NULL, NULL, NULL, NULL, false),
	(6, 'Pesanan Siap Diambil', 'OT006', 5, 'Pakaian Anda telah selesai dan siap untuk diambil.', '2024-12-19 20:31:06.12333+07', NULL, NULL, NULL, NULL, NULL, false),
	(4, 'Pengeringan', 'OT004', 3, 'Pakaian Anda sedang dalam proses pengeringan.', '2024-12-19 20:31:06.12333+07', NULL, NULL, NULL, NULL, NULL, false),
	(8, 'pekerjaan baru berubah', 'TSK007', 7, 'pekerjaan ini tidak diperlukan lagi ', '2025-01-14 10:18:29+07', 'PLACEHOLDER', '2025-01-14 10:20:00+07', 'PLACEHOLDER', '2025-01-14 10:21:41+07', 'PLACEHOLDER', true),
	(9, 'pekerjaan baru lagi', 'TSK008', 8, 'nanti di hapus aja lagi', '2025-01-14 10:22:20+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(1, 'Penerimaan Pesanan', 'OT001', 0, 'Pesanan Anda telah kami terima dan sedang kami proses.', '2025-01-07 13:45:34+07', NULL, NULL, NULL, NULL, NULL, false);


--
-- Data for Name: laundry_progress; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."laundry_progress" ("id", "laundry_order_id", "order_task_id", "finished", "created_at", "created_by", "updated_at", "updated_by", "deleted_at", "deleted_by", "is_deleted") VALUES
	('b88e13fe-59f2-4b23-8007-06541a7034e2', '448917f7-b4ec-4b99-90d3-27798768ca7c', 3, false, '2024-12-19 20:33:21.816061+07', NULL, NULL, NULL, NULL, NULL, false),
	('c8b04aec-9b35-4067-8665-0cba52827839', '448917f7-b4ec-4b99-90d3-27798768ca7c', 4, false, '2024-12-19 20:33:21.816061+07', NULL, NULL, NULL, NULL, NULL, false),
	('bc446aa7-fd6a-4b04-802b-9eec677a12bc', '448917f7-b4ec-4b99-90d3-27798768ca7c', 6, false, '2024-12-19 20:33:21.816061+07', NULL, NULL, NULL, NULL, NULL, false),
	('3f676362-7ec9-49f0-9c48-53b08f86ece4', '448917f7-b4ec-4b99-90d3-27798768ca7c', 2, true, '2024-12-19 20:33:21.816061+07', NULL, '2024-12-19 20:51:12+07', NULL, NULL, NULL, false),
	('2775a07d-ce22-4e57-a11a-e765273602f3', '448917f7-b4ec-4b99-90d3-27798768ca7c', 1, true, '2024-12-19 20:33:21.816061+07', NULL, '2024-12-19 20:51:04+07', NULL, NULL, NULL, false),
	('f570f2d5-63d8-4772-800b-f3db796fd52e', '63d5f1cc-36cb-4b15-8a2c-fbd93e7ecab2', 1, true, '2024-12-20 10:15:48.642942+07', NULL, NULL, NULL, NULL, NULL, false),
	('e23c9180-9abf-4f02-bd36-93ea980e54e7', '63d5f1cc-36cb-4b15-8a2c-fbd93e7ecab2', 2, false, '2024-12-20 10:15:48.642942+07', NULL, NULL, NULL, NULL, NULL, false),
	('ea90d908-9352-461d-b681-c96e20d95655', '63d5f1cc-36cb-4b15-8a2c-fbd93e7ecab2', 3, false, '2024-12-20 10:15:48.642942+07', NULL, NULL, NULL, NULL, NULL, false),
	('8586e8df-cdf9-4ecd-9161-ac4743abe570', '63d5f1cc-36cb-4b15-8a2c-fbd93e7ecab2', 5, false, '2024-12-20 10:15:48.642942+07', NULL, NULL, NULL, NULL, NULL, false),
	('181a2dac-5869-49c5-b3d3-4d90e798318f', '63d5f1cc-36cb-4b15-8a2c-fbd93e7ecab2', 6, false, '2024-12-20 10:15:48.642942+07', NULL, NULL, NULL, NULL, NULL, false),
	('8306d314-c0a1-4a36-a3f8-7a3ab97e52a5', '56259aa4-f743-440c-9863-0d66c38dcb73', 1, true, '2024-12-20 10:17:16.229553+07', NULL, NULL, NULL, NULL, NULL, false),
	('e11d4595-cbde-47c2-bf2d-e56d949b966a', '56259aa4-f743-440c-9863-0d66c38dcb73', 2, false, '2024-12-20 10:17:16.229553+07', NULL, NULL, NULL, NULL, NULL, false),
	('62c773ea-fe0d-45b5-b499-7d9a85b8bbaa', '56259aa4-f743-440c-9863-0d66c38dcb73', 3, false, '2024-12-20 10:17:16.229553+07', NULL, NULL, NULL, NULL, NULL, false),
	('531be257-a882-41c2-b998-4aa13701438f', '56259aa4-f743-440c-9863-0d66c38dcb73', 4, false, '2024-12-20 10:17:16.229553+07', NULL, NULL, NULL, NULL, NULL, false),
	('4fb43fc0-3de0-4621-8838-1333e816cb3e', '56259aa4-f743-440c-9863-0d66c38dcb73', 5, false, '2024-12-20 10:17:16.229553+07', NULL, NULL, NULL, NULL, NULL, false),
	('8ed890aa-ff4b-4664-bd61-42826092c27c', '56259aa4-f743-440c-9863-0d66c38dcb73', 6, false, '2024-12-20 10:17:16.229553+07', NULL, NULL, NULL, NULL, NULL, false),
	('cffd3836-6167-4060-a9ad-7731d57433bc', 'a1adbdf0-17fc-4520-9613-53381e431c85', 1, true, '2024-12-20 10:18:58.735585+07', NULL, NULL, NULL, NULL, NULL, false),
	('5dd1b300-4229-46d4-8fd7-251d7043b015', 'a1adbdf0-17fc-4520-9613-53381e431c85', 2, false, '2024-12-20 10:18:58.735585+07', NULL, NULL, NULL, NULL, NULL, false),
	('92d953b1-4601-45ec-aba5-7e17c8c227a6', 'a1adbdf0-17fc-4520-9613-53381e431c85', 3, false, '2024-12-20 10:18:58.735585+07', NULL, NULL, NULL, NULL, NULL, false),
	('1bfced05-49f5-4400-be6d-00fe42785338', 'a1adbdf0-17fc-4520-9613-53381e431c85', 4, false, '2024-12-20 10:18:58.735585+07', NULL, NULL, NULL, NULL, NULL, false),
	('d0ae989e-b120-4c37-aa67-1554cd8b0d8f', 'a1adbdf0-17fc-4520-9613-53381e431c85', 5, false, '2024-12-20 10:18:58.735585+07', NULL, NULL, NULL, NULL, NULL, false),
	('1940b1ad-7ec8-44d1-b506-2126c98f21ad', 'a1adbdf0-17fc-4520-9613-53381e431c85', 6, false, '2024-12-20 10:18:58.735585+07', NULL, NULL, NULL, NULL, NULL, false),
	('5ffaf49a-ffb2-4112-b699-6e61461d6ff2', 'd216d355-e189-4579-b9e0-9b271e65aefe', 1, true, '2024-12-20 10:20:07.931149+07', NULL, NULL, NULL, NULL, NULL, false),
	('1d14b9fe-3010-4601-958c-3adf07d657aa', '91b278cd-920d-49c0-a891-ec62ee5b3d42', 1, true, '2024-12-30 20:27:56.342306+07', NULL, NULL, NULL, NULL, NULL, false),
	('5d1bf04d-3e93-4972-94ea-739f74f9fbf7', '91b278cd-920d-49c0-a891-ec62ee5b3d42', 4, false, '2024-12-30 20:27:56.342306+07', NULL, NULL, NULL, NULL, NULL, false),
	('94d7d02e-4911-4880-a00d-4aa77e9c8449', 'd216d355-e189-4579-b9e0-9b271e65aefe', 2, true, '2024-12-20 10:20:07.931149+07', NULL, NULL, NULL, NULL, NULL, false),
	('e397ccd6-e26c-4baa-a862-8d95c26db56e', 'd216d355-e189-4579-b9e0-9b271e65aefe', 5, true, '2024-12-20 10:20:07.931149+07', NULL, NULL, NULL, NULL, NULL, false),
	('435b2f67-ce32-46eb-a8b9-3c94247095fe', 'd216d355-e189-4579-b9e0-9b271e65aefe', 6, true, '2024-12-20 10:20:07.931149+07', NULL, NULL, NULL, NULL, NULL, false),
	('67369feb-800e-4faa-8551-e0ab2589c63a', '91b278cd-920d-49c0-a891-ec62ee5b3d42', 2, true, '2024-12-30 20:27:56.342306+07', NULL, NULL, NULL, NULL, NULL, false),
	('c1515528-f78f-4c5c-9ec6-1661da6ebe95', '91b278cd-920d-49c0-a891-ec62ee5b3d42', 3, true, '2024-12-30 20:27:56.342306+07', NULL, NULL, NULL, NULL, NULL, false);


--
-- Data for Name: laundry_service_task; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."laundry_service_task" ("id", "order_task_id", "laundry_service_id", "created_at", "created_by", "updated_at", "updated_by", "deleted_at", "deleted_by", "is_deleted") OVERRIDING SYSTEM VALUE VALUES
	(1, 1, 1, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(2, 2, 1, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(3, 3, 1, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(4, 4, 1, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(5, 5, 1, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(6, 6, 1, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(8, 1, 2, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(9, 2, 2, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(10, 3, 2, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(11, 4, 2, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(12, 6, 2, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(14, 1, 3, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(16, 3, 3, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(17, 4, 3, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(18, 6, 3, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(20, 1, 4, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(21, 2, 4, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(22, 5, 4, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(23, 6, 4, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(25, 1, 5, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(26, 2, 5, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(27, 3, 5, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(28, 4, 5, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(29, 6, 5, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(31, 1, 6, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(32, 2, 6, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(33, 3, 6, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(34, 4, 6, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(35, 5, 6, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(36, 6, 6, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(38, 1, 7, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(39, 2, 7, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(40, 3, 7, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(41, 5, 7, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(42, 6, 7, '2024-12-19 20:31:06.129341+07', NULL, NULL, NULL, NULL, NULL, false),
	(44, 1, 8, '2024-12-30 20:27:05+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(45, 2, 8, '2024-12-30 20:27:05+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(48, 4, 8, '2024-12-30 20:27:05+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(57, 6, 8, '2024-12-31 11:24:35+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(58, 3, 8, '2024-12-31 11:25:37+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(59, 1, 9, '2024-12-31 17:25:31+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(61, 1, 10, '2024-12-31 17:26:52+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(63, 1, 11, '2024-12-31 17:28:20+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(64, 5, 11, '2024-12-31 17:28:20+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(66, 2, 12, '2024-12-31 18:47:31+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(67, 4, 12, '2024-12-31 18:47:31+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(68, 1, 13, '2024-12-31 18:55:27+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(69, 5, 13, '2024-12-31 18:55:27+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(70, 2, 14, '2024-12-31 18:57:35+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false),
	(72, 1, 15, '2024-12-31 18:58:23+07', 'PLACEHOLDER', NULL, NULL, NULL, NULL, false);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: hooks; Type: TABLE DATA; Schema: supabase_functions; Owner: supabase_functions_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: laundry_branch_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."laundry_branch_id_seq"', 6, true);


--
-- Name: laundry_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."laundry_service_id_seq"', 15, true);


--
-- Name: laundry_service_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."laundry_service_task_id_seq"', 73, true);


--
-- Name: order_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."order_task_id_seq"', 9, true);


--
-- Name: hooks_id_seq; Type: SEQUENCE SET; Schema: supabase_functions; Owner: supabase_functions_admin
--

SELECT pg_catalog.setval('"supabase_functions"."hooks_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
