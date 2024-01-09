#!/usr/bin/env ruby

require_relative 'node.rb'

class Broadcast
  attr_reader :node
  def initialize
    @node = Node.new
  end
end

Broadcast.new.node.main!