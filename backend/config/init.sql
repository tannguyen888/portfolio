-- =============================================
-- Migration: Create portfolio_database schema
-- Run in MySQL Workbench: File > Open SQL Script
-- =============================================

-- Tạo database
CREATE DATABASE IF NOT EXISTS portfolio_database;
USE portfolio_database;

-- Bảng lưu contact messages
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index cho truy vấn theo thời gian
CREATE INDEX idx_contacts_created_at ON contacts (created_at DESC);
