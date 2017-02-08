# == Schema Information
#
# Table name: stops
#
#  id          :integer      not null, primary key
#  name        :string
#
# Table name: routes
#
#  num         :string       not null, primary key
#  company     :string       not null, primary key
#  pos         :integer      not null, primary key
#  stop_id     :integer

require_relative './sqlzoo.rb'

def num_stops
  # How many stops are in the database?
  execute(<<-SQL)
  SELECT
    COUNT(id)
  FROM
    stops
  SQL
end

def craiglockhart_id
  # Find the id value for the stop 'Craiglockhart'.
  execute(<<-SQL)
    SELECT
      id
    FROM
      stops
    WHERE
      name = 'Craiglockhart'
  SQL
end

def lrt_stops
  # Give the id and the name for the stops on the '4' 'LRT' service.
  execute(<<-SQL)
    SELECT
      stops.id, stops.name
    FROM
      stops
    JOIN
      routes ON stops.id = routes.stop_id
    WHERE
      routes.num = '4'
  SQL
end

def connecting_routes
  # Consider the following query:
  #

  #
  # The query gives the number of routes that visit either London Road
  # (149) or Craiglockhart (53). Run the query and notice the two services
  # that link these stops have a count of 2. Add a HAVING clause to restrict
  # the output to these two routes.
  execute(<<-SQL)
    SELECT
      company,
      num,
      COUNT(*)
    FROM
      routes
    WHERE
      stop_id = 149 OR stop_id = 53
    GROUP BY
      company, num
    HAVING
      COUNT(stop_id) = 2
  SQL
end

def cl_to_lr
  # Consider the query:
  # Observe that b.stop_id gives all the places you can get to from
  # Craiglockhart, without changing routes. Change the query so that it
  # shows the services from Craiglockhart to London Road.

  execute(<<-SQL)
      SELECT
      a.company,
      a.num,
      a.stop_id,
      b.stop_id
    FROM
      routes a
    JOIN
      routes b ON a.company = b.company AND a.num = b.num
    JOIN
      stops ON a.stop_id = stops.id
    WHERE
      a.stop_id = 53 AND b.stop_id = 149
  SQL
end

def cl_to_lr_by_name
  # The query shown is similar to the previous one, however by joining two
  # copies of the stops table we can refer to stops by name rather than by
  # number. Change the query so that the services between 'Craiglockhart' and
  # 'London Road' are shown.
  execute(<<-SQL)
    SELECT
      a.company,
      a.num,
      stopa.name,
      stopb.name
    FROM
      routes AS a
    JOIN
      routes AS b ON (a.company = b.company AND a.num = b.num)
    JOIN
      stops AS stopa ON (a.stop_id = stopa.id)
    JOIN
      stops AS stopb ON (b.stop_id = stopb.id)
    WHERE
      stopa.name = 'Craiglockhart' AND stopb.name = 'London Road'

  SQL
end

def haymarket_and_leith
  # Give the company and num of the services that connect stops
  # 115 and 137 ('Haymarket' and 'Leith')
  execute(<<-SQL)
    SELECT DISTINCT
      first.company, first.num
    FROM
      routes AS first
    JOIN
      routes AS second ON first.company = second.company AND
      first.num = second.num
    WHERE
      first.stop_id = 115 AND second.stop_id = 137

  SQL
end

def craiglockhart_and_tollcross
  # Give the company and num of the services that connect stops
  # 'Craiglockhart' and 'Tollcross'
  execute(<<-SQL)
    SELECT
      first.company, first.num
    FROM
      routes as first
    JOIN
      routes as second ON first.company = second.company AND first.num = second.num
    WHERE
      first.stop_id = (
        SELECT
          id
        FROM
          stops
        WHERE
          stops.name = 'Craiglockhart'
        ) AND second.stop_id = (
          SELECT
            id
          FROM
            stops
          WHERE
            stops.name = 'Tollcross'
        )
  SQL
end

def start_at_craiglockhart
  # Give a distinct list of the stops that can be reached from 'Craiglockhart'
  # by taking one bus, including 'Craiglockhart' itself. Include the stop name,
  # as well as the company and bus no. of the relevant service.
  execute(<<-SQL)
    SELECT
      stops.name, end_routes.company, end_routes.num
    FROM
      routes AS start_routes
    JOIN
      routes AS end_routes ON start_routes.num = end_routes.num
      AND start_routes.company = end_routes.company
    JOIN
      stops ON stops.id = end_routes.stop_id
    WHERE
      start_routes.stop_id = (
        SELECT
          stops.id
        FROM
          stops
        WHERE
          stops.name = 'Craiglockhart'
      )
  SQL
end

def craiglockhart_to_sighthill
  # Find the routes involving two buses that can go from Craiglockhart to
  # Sighthill. Show the bus no. and company for the first bus, the name of the
  # stop for the transfer, and the bus no. and company for the second bus.

  execute(<<-SQL)
   SELECT DISTINCT
    first_bus.num,
    first_bus.company,
    transfer.name,
    second_bus.num,
    second_bus.company
  FROM
    stops AS starting_point
  JOIN
    routes AS first_bus ON first_bus.stop_id = starting_point.id
  JOIN
    routes AS to_transfer ON to_transfer.num = first_bus.num AND to_transfer.company = first_bus.company
  JOIN
    stops AS transfer ON to_transfer.stop_id = transfer.id
  JOIN
    routes AS second_bus ON second_bus.stop_id = transfer.id
  JOIN
    routes AS to_destination ON second_bus.num = to_destination.num AND second_bus.company = to_destination.company
  JOIN
    stops AS destination ON to_destination.stop_id = destination.id

  WHERE
    starting_point.name = 'Craiglockhart' AND destination.name = 'Sighthill'

  SQL
end
