﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace TestBlocklyHtml
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MathOperationsController : ControllerBase
    {
        
        private Math2Values ExecuteOperation(Operation op, int x, Math2Values data)
        {


            return null;
        }
        [HttpPost("{x}/{y}")]
        public Math2Values GetData(int x, int y)
        {
            return new Math2Values()
            {
                x = x,
                y = y
            };
        }
        [HttpPost("{id}/{x}")]
        public Math2Values Operation(Operation id, int x,[FromBody] Math2Values data)
        {
            return ExecuteOperation(id, x, data);
        }
        [HttpPost]
        public int  Add([FromBody]Math2Values data)
        {
            return data.x + data.y;
        }
        [HttpPost]
        public int Divide([FromBody]Math2Values data)
        {
            return data.x / data.y;
        }

        [HttpPost("{id}")]
        public int Operations(Operation id,[FromBody] Math2Values data)
        {
            return data.x / data.y;
        }

    }
    }