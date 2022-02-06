import React from "react";
import {
  Box,
  Flex,
  Text,
  CircularProgress,
  CircularProgressLabel,
  Divider,
} from "@chakra-ui/react";
import { BiDollar } from "react-icons/bi";
import { MdAir } from "react-icons/md";
import { BsCalendar3 } from "react-icons/bs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import Chart from "react-apexcharts";

function UserDashboard() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const series = [
    {
      name: "Balance",
      data: [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    {
      name: "Flow",
      data: [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
  ];
  const options = {
    chart: {
      height: "100px",
      type: "area",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      labels: {
        show: false,
      },
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T07:30:00.000Z",
        "2018-09-19T08:30:00.000Z",
        "2018-09-19T09:30:00.000Z",
        "2018-09-19T10:30:00.000Z",
        "2018-09-19T11:30:00.000Z",
        "2018-09-19T12:30:00.000Z",
      ],
    },
    yaxis: {
      labels: {
        show: false,
      },
      // min: 0,
      // max: 12,
      tickAmount: 30,
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },

    tooltip: {
      enabled: false,
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <>
      <Box>
        <Box w="100%" mb="2em" rounded="20px" bg="blackAlpha.300" p="2em">
          <Box cursor="pointer">
            <Chart options={options} series={series} type="area" />
          </Box>

          <Divider borderColor="black" />
          <Flex mt="2em" justifyContent="space-around">
            <Flex alignItems="center">
              <Box bg="#0177FF" p="0.8em" rounded="full">
                {" "}
                <BiDollar fontSize="20px" />
              </Box>
              <Box ml="1em">
                <Text fontSize="19px" fontWeight="600">
                  Balance
                </Text>
                <Text>0.61</Text>
              </Box>
            </Flex>
            <Flex alignItems="center">
              <Box bg="#0177FF" p="0.8em" rounded="full">
                {" "}
                <MdAir fontSize="20px" />
              </Box>
              <Box ml="1em">
                <Text fontSize="19px" fontWeight="600">
                  Current Flow Rate
                </Text>
                <Text>5.36 per day</Text>
              </Box>
            </Flex>
            <Flex alignItems="center">
              <Box bg="#0177FF" p="0.8em" rounded="full">
                {" "}
                <BsCalendar3 fontSize="20px" />
              </Box>
              <Box ml="1em">
                <Text fontSize="19px" fontWeight="600">
                  MRR
                </Text>
                <Text>163</Text>
              </Box>
            </Flex>
          </Flex>
        </Box>

        <Flex w="100%" justifyContent="space-between">
          <Flex
            justifyContent="space-between"
            bg="blackAlpha.300"
            py="2em"
            alignItems="center"
            px="2em"
            rounded="20px"
            w="100%"
            mr="1em"
          >
            <Box mr="5em">
              <Text fontSize="21px" fontWeight={600}>
                0.000
              </Text>
              <Text>ASM Distrubuted</Text>
            </Box>
            <CircularProgress value={0} size="70px" color="#0177FF">
              <CircularProgressLabel>0%</CircularProgressLabel>
            </CircularProgress>
          </Flex>
          <Flex
            justifyContent="space-between"
            bg="blackAlpha.300"
            p="2em"
            w="100%"
            ml="1em"
            rounded="20px"
            alignItems="center"
          >
            <Box mr="5em">
              <Text fontSize="21px" fontWeight={600}>
                10,0000
              </Text>
              <Text>ASM Remaining</Text>
            </Box>
            <CircularProgress value={100} size="70px" color="#0177FF">
              <CircularProgressLabel>100%</CircularProgressLabel>
            </CircularProgress>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default UserDashboard;
