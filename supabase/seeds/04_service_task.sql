INSERT INTO laundry_service_task ("order_task_id", "laundry_service_id")
VALUES
-- Cuci Lengkap (LS001): Uses all tasks in order
(1, 1), -- Order Received
(2, 1), -- Sorting
(3, 1), -- Washing
(4, 1), -- Drying
(5, 1), -- Ironing
(6, 1), -- Order Ready to Pick
(7, 1), -- Finished

-- Cuci Sepatu (LS002): Mandatory tasks + Washing and Drying
(1, 2), -- Order Received
(2, 2), -- Sorting
(3, 2), -- Washing
(4, 2), -- Drying
(6, 2), -- Order Ready to Pick
(7, 2), -- Finished

-- Cuci Saja (LS003): Mandatory tasks + Washing and Drying
(1, 3), -- Order Received
(2, 3), -- Sorting
(3, 3), -- Washing
(4, 3), -- Drying
(6, 3), -- Order Ready to Pick
(7, 3), -- Finished

-- Setrika Saja (LS004): Mandatory tasks + Ironing only
(1, 4), -- Order Received
(2, 4), -- Sorting
(5, 4), -- Ironing
(6, 4), -- Order Ready to Pick
(7, 4), -- Finished

-- Cuci dan Kering (LS005): Mandatory tasks + Sorting, Washing, and Drying
(1, 5), -- Order Received
(2, 5), -- Sorting
(3, 5), -- Washing
(4, 5), -- Drying
(6, 5), -- Order Ready to Pick
(7, 5), -- Finished

-- Cuci Ekspres (LS006): Mandatory tasks + all other tasks
(1, 6), -- Order Received
(2, 6), -- Sorting
(3, 6), -- Washing
(4, 6), -- Drying
(5, 6), -- Ironing
(6, 6), -- Order Ready to Pick
(7, 6), -- Finished

-- Cuci Karpet (LS007): Mandatory tasks + Washing and Ironing
(1, 7), -- Order Received
(2, 7), -- Sorting
(3, 7), -- Washing
(5, 7), -- Ironing
(6, 7), -- Order Ready to Pick
(7, 7); -- Finished
